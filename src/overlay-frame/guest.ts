import { OVERLAY_FRAME_PROTOCOL } from "./protocol";

export interface OverlayFrameGuestOptions {
  /** The element the example renders into. Everything else in <body> is treated as a layer. */
  readonly rootSelector: string;
  /** Room kept below (and around) a layer, in px. */
  readonly gap: number;
  /** Height requests per second; bounds a layer that grows with the frame (sized in vh). */
  readonly maxRequestsPerSecond: number;
  /**
   * Origin of the embedding page, for the postMessage fallback (cross-origin frames). `null`: the
   * parent's origin as the browser reports it (`location.ancestorOrigins`), else this document's own.
   */
  readonly hostOrigin: string | null;
  readonly messageType: string;
  readonly hostGlobal: string;
  readonly outsidePressType: string;
  readonly syncType: string;
  readonly guestGlobal: string;
}

export const DEFAULT_GUEST_OPTIONS: OverlayFrameGuestOptions = {
  rootSelector: "#root",
  gap: 16,
  maxRequestsPerSecond: 12,
  hostOrigin: null,
  ...OVERLAY_FRAME_PROTOCOL,
};

/**
 * Runs inside the framed document. While an overlay (anything rendered next to the root: popovers,
 * menus, tooltips, dialogs) does not fit the frame, it asks the host for the height it needs, and it
 * hands the height back once nothing floats. Documents without such overlays are never touched.
 *
 * While the frame is taller, the example must look exactly as it did, so on the first request it
 * freezes the painted state:
 *  - the root is pinned at its current position and size. The embedder's CSS may centre it in
 *    `html, body { height: 100% }`, which would re-centre it as the frame grows (and with body
 *    margins, overflow the centred html by a few px each way);
 *  - scrollbars are removed before the root is measured: the overflowing overlay makes a classic
 *    scrollbar appear, which narrows centred content by half its width. A gutter the resting page
 *    already had is kept, so the width does not change either;
 *  - the resting scroll offset is restored and kept valid: opening can scroll the document itself
 *    (scrollIntoView of the selected option scrolls every ancestor).
 * Positioning libraries are then told the viewport changed (a `resize` event, which the browser
 * would dispatch only in the next frame), and the re-placed overlay is measured again before paint.
 *
 * Growing only adds room at the bottom. An overlay flipped above its trigger (neither side fitted)
 * gets its own height of room below, so its preferred placement fits and it flips back; one that
 * does not move (fixed top placement) cannot be helped and does not grow the frame further.
 *
 * An overlay the frame squeezes rather than cuts off gets the room it would take in a window: a
 * dropdown a positioning library sized to the room below its trigger, which then scrolls, gets what
 * its scroll area hides; a side drawer as tall as the viewport gets all the host allows. It keeps
 * that room while it is open, since shrinking back would squeeze it again.
 *
 * A press outside the frame never reaches this document, so overlays that close on an outside press
 * would stay open. The host reports it (`outsidePress`) and it is replayed here as a press on the
 * body, outside every overlay, which is what Floating UI's useDismiss, Base UI, Radix or MUI's
 * ClickAwayListener listen for on the document.
 *
 * A host that attaches after a height was sent (late, or again while an overlay is open) calls
 * `sync`, and the height is sent again even though it did not change.
 *
 * Self-contained on purpose: it is serialised with Function.prototype.toString (see
 * overlayFrameGuestScript), so it must not use anything from this module's scope.
 */
export function overlayFrameGuest(options: OverlayFrameGuestOptions): void {
  const found = document.querySelector<HTMLElement>(options.rootSelector);
  if (!found) return;
  const root: HTMLElement = found;
  const gap = options.gap;
  const hostOrigin = options.hostOrigin ?? location.ancestorOrigins?.[0] ?? location.origin;
  const PIN_ATTRIBUTE = "data-overlay-frame-pinned";

  type Rest = { x: number; y: number; scrollbar: boolean };
  const readRest = (): Rest => ({
    x: scrollX,
    y: scrollY,
    scrollbar: innerWidth - document.documentElement.clientWidth > 0,
  });

  let rest = readRest();
  let freezeStyle: HTMLStyleElement | null = null;
  let frozenViewport = 0;
  // undefined: not known to the host (it attached after the last request).
  let lastNeed: number | null | undefined = null;
  let lastTopOverflow: number | null = null;
  let requestTimes: number[] = [];
  let retryTimer = 0;
  let scheduled = false;
  let settling = 0;
  let unfreezeTimer = 0;

  const coversViewport = (r: DOMRect) => r.width >= innerWidth - 1 && r.height >= innerHeight - 1;

  type Layer = { el: Element; r: DOMRect };

  // What is rendered next to the root. Full-viewport wrappers (backdrops, portal hosts) are
  // searched rather than measured; 1–2px helpers (focus guards, live regions) are ignored.
  function layers(): Layer[] {
    const open: Layer[] = [];
    const visit = (el: Element, depth: number) => {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      if (r.width > 2 && r.height > 2 && !coversViewport(r)) {
        open.push({ el, r });
        return;
      }
      if ((r.width > 0 && r.width <= 2) || (r.height > 0 && r.height <= 2) || depth >= 5) return;
      for (const child of Array.from(el.children)) visit(child, depth + 1);
    };
    for (const el of Array.from(document.body.children)) {
      if (el !== root && el.tagName !== "SCRIPT" && el.tagName !== "STYLE") visit(el, 0);
    }
    return open;
  }

  // How close to the viewport's edge (px) a scroll area ends when the viewport sizes it: positioning
  // libraries keep a few px of padding from it.
  const EDGE = 32;
  // The room each squeezed layer asked for, kept while it stays open: shrinking back would squeeze
  // it again.
  const floors = new WeakMap<Element, number>();

  // The height a layer squeezed to fit the frame, rather than cut off by it, would take in a window.
  // One exactly as tall as the viewport (a side drawer) takes all the host allows; one with a scroll
  // area hiding content and ending at the viewport's edge (a list sized to the room below its
  // trigger) takes what that area hides.
  function squeezedRoom({ el, r }: Layer, vh: number): number {
    if (Math.abs(r.top) <= 1 && Math.abs(r.bottom - vh) <= 1) return Infinity;
    let hidden = 0;
    for (const area of [el, ...Array.from(el.querySelectorAll("*"))]) {
      if (area.scrollHeight <= area.clientHeight + 1) continue;
      const a = area.getBoundingClientRect();
      const atEdge = (a.bottom >= vh - EDGE && a.bottom <= vh + 1) || (a.top >= -1 && a.top <= EDGE);
      if (atEdge && /auto|scroll/.test(getComputedStyle(area).overflowY)) {
        hidden = Math.max(hidden, area.scrollHeight - area.clientHeight);
      }
    }
    return hidden ? vh + hidden + EDGE : 0;
  }

  function requiredHeight(open: Layer[]) {
    const vh = innerHeight;
    let need = 0;
    let overflow = false;
    let topOverflow = 0;
    let cutOffAtTop = 0;
    for (const layer of open) {
      const r = layer.r;
      if (r.bottom > vh) overflow = true;
      if (r.top < 0) {
        overflow = true;
        topOverflow = Math.max(topOverflow, -r.top);
        cutOffAtTop = Math.max(cutOffAtTop, r.height);
      }
      need = Math.max(need, r.bottom + gap, r.height + 2 * gap);
      const floor = Math.max(floors.get(layer.el) ?? 0, squeezedRoom(layer, vh));
      if (floor) {
        floors.set(layer.el, floor);
        if (floor > vh + 1) overflow = true;
        need = Math.max(need, floor);
      }
    }
    if (topOverflow > 0) {
      const stuck = lastTopOverflow !== null && Math.abs(lastTopOverflow - topOverflow) < 1;
      if (!stuck) need = Math.max(need, vh + cutOffAtTop + gap);
    }
    return { overflow, need: Math.ceil(need), topOverflow };
  }

  function freeze() {
    frozenViewport = innerHeight;
    freezeStyle = document.createElement("style");
    freezeStyle.setAttribute("data-overlay-frame", "frozen");
    const noScrollbars =
      "html,body{overflow:hidden!important}" +
      (rest.scrollbar ? "html{scrollbar-gutter:stable!important}" : "");
    freezeStyle.textContent = noScrollbars;
    document.head.appendChild(freezeStyle);

    if (scrollX !== rest.x || scrollY !== rest.y) scrollTo(rest.x, rest.y);
    const r = root.getBoundingClientRect();
    // The root can be matched by any selector; pin it through an attribute of our own.
    root.setAttribute(PIN_ATTRIBUTE, "");
    freezeStyle.textContent =
      noScrollbars +
      "html,body{height:auto!important}" +
      // Keep the document tall (wide) enough for the resting scroll offset to stay valid.
      `html{min-height:calc(100% + ${rest.y}px)!important` +
      (rest.x ? `;min-width:calc(100% + ${rest.x}px)!important` : "") +
      "}body{min-height:0!important}" +
      `[${PIN_ATTRIBUTE}]{position:absolute!important;margin:0!important;box-sizing:border-box!important;` +
      `top:${r.top + rest.y}px!important;left:${r.left + rest.x}px!important;` +
      `width:${r.width}px!important;height:${r.height}px!important;min-height:0!important}`;
  }

  function unfreeze() {
    clearTimeout(unfreezeTimer);
    if (!freezeStyle) return;
    freezeStyle.remove();
    freezeStyle = null;
    root.removeAttribute(PIN_ATTRIBUTE);
    frozenViewport = 0;
    lastTopOverflow = null;
  }

  function send(need: number | null) {
    if (need === lastNeed) return;
    if (need !== null) {
      const now = Date.now();
      requestTimes = requestTimes.filter((t) => now - t < 1000);
      if (requestTimes.length >= options.maxRequestsPerSecond) {
        // Measure again once the oldest request leaves the window, so the latest need is not lost.
        clearTimeout(retryTimer);
        retryTimer = window.setTimeout(schedule, 1000 - (now - requestTimes[0]));
        return;
      }
      requestTimes.push(now);
    }
    lastNeed = need;
    const host = (window as unknown as Record<string, unknown>)[options.hostGlobal] as
      | { requestHeight?: (need: number | null) => void }
      | undefined;
    if (host && typeof host.requestHeight === "function") host.requestHeight(need);
    else parent.postMessage({ type: options.messageType, need }, hostOrigin);
  }

  function measure() {
    scheduled = false;
    const open = layers();
    if (!open.length) {
      if (!freezeStyle) {
        rest = readRest();
        return;
      }
      send(null);
      // Release the root once the host has restored the resting height (or shortly after);
      // releasing it earlier would re-centre the example in the still-tall frame.
      clearTimeout(unfreezeTimer);
      unfreezeTimer = window.setTimeout(unfreeze, 400);
      if (Math.abs(innerHeight - frozenViewport) <= 1) unfreeze();
      return;
    }

    let result = requiredHeight(open);
    if (!freezeStyle && !result.overflow) return;
    clearTimeout(unfreezeTimer);
    const freezing = !freezeStyle;
    if (freezing) {
      freeze();
      result = requiredHeight(layers());
    }
    lastTopOverflow = result.topOverflow > 0 ? result.topOverflow : null;
    send(result.need);

    if (freezing) {
      // Until this frame is painted, measure mutations (the overlay being re-placed) right away.
      settling = 5;
      window.setTimeout(() => (settling = 0), 0);
      dispatchEvent(new Event("resize"));
    }
  }

  // Batched to the next frame; the timeout covers documents whose frames are paused or throttled.
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    const run = () => {
      if (scheduled) measure();
    };
    requestAnimationFrame(run);
    window.setTimeout(run, 100);
  }

  // Microtasks queued from a requestAnimationFrame callback still run before that frame's paint.
  new MutationObserver((records) => {
    // While frozen, changes inside the pinned root are skipped (an animated example would cost a
    // measure per frame): a layer re-placed after one of them mutates itself.
    if (freezeStyle && records.every((record) => root.contains(record.target))) return;
    if (settling > 0 && freezeStyle) {
      settling--;
      measure();
    } else {
      schedule();
    }
  }).observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class", "hidden", "open"],
  });

  addEventListener("resize", () => {
    if (freezeStyle && lastNeed === null && Math.abs(innerHeight - frozenViewport) <= 1) unfreeze();
    schedule();
  });

  // Scroll events arrive a frame late, so a scroll caused by an opening overlay arrives once the
  // overlay exists and is not taken as the resting offset.
  addEventListener("scroll", () => {
    if (!freezeStyle && !layers().length) rest = readRest();
  }, { passive: true });

  function outsidePress() {
    if (!layers().length) return;
    // Coordinates outside the viewport, so no library mistakes it for a press on a scrollbar.
    const mouse = { bubbles: true, cancelable: true, composed: true, view: window, clientX: -1, clientY: -1 };
    const pointer = { ...mouse, pointerId: 1, pointerType: "mouse", isPrimary: true };
    const body = document.body;
    body.dispatchEvent(new PointerEvent("pointerdown", { ...pointer, buttons: 1 }));
    body.dispatchEvent(new MouseEvent("mousedown", { ...mouse, buttons: 1 }));
    body.dispatchEvent(new PointerEvent("pointerup", pointer));
    body.dispatchEvent(new MouseEvent("mouseup", mouse));
    body.dispatchEvent(new MouseEvent("click", mouse));
  }

  // Measured at once: a same-origin host calls this from attaching, right after the previous host
  // (if any) collapsed the frame, so the height is back before that collapse is ever laid out.
  function sync() {
    lastNeed = undefined;
    measure();
  }

  (window as unknown as Record<string, unknown>)[options.guestGlobal] = { outsidePress, sync };
  addEventListener("message", (event) => {
    const data = event.data as { type?: string } | null;
    if (event.source !== parent) return;
    if (data?.type === options.outsidePressType) outsidePress();
    else if (data?.type === options.syncType) sync();
  });
}

/** Inline script for the framed document; place it after the root element. */
export function overlayFrameGuestScript(options: Partial<OverlayFrameGuestOptions> = {}): string {
  // `<` escaped, so no value can end the script element (`</script>`) or open a comment (`<!--`).
  const config = JSON.stringify({ ...DEFAULT_GUEST_OPTIONS, ...options }).replace(/</g, "\\u003c");
  return `<script>(${overlayFrameGuest.toString()})(${config});<\/script>`;
}
