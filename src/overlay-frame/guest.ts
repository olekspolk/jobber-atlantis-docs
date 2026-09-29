import { OVERLAY_FRAME_PROTOCOL, type OverlayFrameExtent, type OverlayFrameSize } from "./protocol";

export interface OverlayFrameGuestOptions {
  /** The element the example renders into. Everything else in <body> is treated as a layer. */
  readonly rootSelector: string;
  /** Room kept around a layer the frame grows for, in px. */
  readonly gap: number;
  /** Size requests per second; bounds an overlay that keeps resizing as the frame does. */
  readonly maxRequestsPerSecond: number;
  /**
   * Origin of the embedding page, for the postMessage fallback (cross-origin frames). `null`: the
   * parent's origin as the browser reports it (`location.ancestorOrigins`), else this document's own.
   */
  readonly hostOrigin: string | null;
  readonly messageType: string;
  readonly extentType: string;
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
 * menus, tooltips, dialogs; or positioned out of the root's flow, like a dropdown drawn under its
 * trigger) does not fit the frame, it asks the host for the size it needs, and it hands the size
 * back once nothing floats. Documents without such overlays are never touched.
 *
 * While the frame is taller, the example must look exactly as it did, so on the first request it
 * freezes the painted state:
 *  - the root is pinned at its current position and size. The embedder's CSS may centre it in
 *    `html, body { height: 100% }`, which would re-centre it as the frame grows (and with body
 *    margins, overflow the centred html by a few px each way);
 *  - the root is measured with the resting page's scrollbars and no others: the overflowing overlay
 *    makes a classic scrollbar appear, which narrows centred content by half its width, and a
 *    horizontal one the resting page had (an example wider than the frame) would lift it by half its
 *    height once gone. Pinned, it no longer depends on them, and they are removed; a resting vertical
 *    one's gutter is kept, so the width does not change either;
 *  - the resting scroll offset is restored and kept valid: opening can scroll the document itself
 *    (scrollIntoView of the selected option scrolls every ancestor).
 * Positioning libraries are then told the viewport changed (a `resize` event, which the browser
 * would dispatch only in the next frame), and the re-placed overlay is measured again before paint.
 *
 * Growing adds room at the bottom and at the sides, never at the top. An overlay flipped above its
 * trigger (neither side fitted) gets its own height of room below, so its preferred placement fits
 * and it flips back; one that does not move (fixed top placement) cannot be helped and does not grow
 * the frame further.
 *
 * An overlay cut off at a side of the frame (partly out of it: one placed out of view on purpose is
 * left alone) asks for the frame to reach that much further on that side, and the host extends it
 * as far as the page has room. Extending it to the left moves this document's viewport left on the
 * page, so the pinned root moves right by as much and stays where it was painted; positioning
 * libraries re-place the overlay against it. The sides only widen while an overlay is open.
 *
 * An overlay the frame squeezes rather than cuts off gets the room it would take in a window: a
 * dropdown a positioning library sized to the room below its trigger, which then scrolls, gets what
 * its scroll area hides; a side drawer as tall as the viewport gets all the host allows. It keeps
 * that room while it is open, since shrinking back would squeeze it again. So does an overlay laid
 * out against the viewport (a full-screen viewer, a layer sized in vh), which gets all the host
 * allows as soon as its bottom moves as far as the frame grew, instead of creeping towards it.
 *
 * A press outside the frame never reaches this document, so overlays that close on an outside press
 * would stay open. The host reports it (`outsidePress`) and it is replayed here as a press on the
 * body, outside every overlay, which is what Floating UI's useDismiss, Base UI, Radix or MUI's
 * ClickAwayListener listen for on the document.
 *
 * A host that attaches after a size was sent (late, or again while an overlay is open) calls
 * `sync`, and the size is sent again even though it did not change.
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

  type Rest = { x: number; y: number; scrollbarX: boolean; scrollbarY: boolean };
  const readRest = (): Rest => ({
    x: scrollX,
    y: scrollY,
    scrollbarX: innerHeight - document.documentElement.clientHeight > 0,
    scrollbarY: innerWidth - document.documentElement.clientWidth > 0,
  });

  let rest = readRest();
  let freezeStyle: HTMLStyleElement | null = null;
  // Where the root is pinned while frozen (before the frame's extension to the left), and the
  // viewport's size then: the frame's resting size.
  let pin: { top: number; left: number; width: number; height: number } | null = null;
  let frozenViewport = { width: 0, height: 0 };
  // undefined: not known to the host (it attached after the last request).
  let lastSize: OverlayFrameSize | null | undefined = null;
  // How far past its resting sides the host has extended the frame; and how far the open overlays
  // asked for, kept while they stay open, since shrinking back would cut them off again.
  let extent: OverlayFrameExtent = { left: 0, right: 0 };
  let sides = { left: 0, right: 0 };
  let lastTopOverflow: number | null = null;
  let requestTimes: number[] = [];
  let retryTimer = 0;
  let scheduled = false;
  let settling = 0;
  let unfreezeTimer = 0;
  // An overlay inside the root was open at the last measure: changes in the pinned root then count.
  let openInRoot = false;

  // Exactly the viewport's box, with or without its scrollbars: a backdrop, a portal host. A panel
  // larger than the viewport is not one, it overflows it.
  const coversViewport = (r: DOMRect) => {
    const { clientWidth, clientHeight } = document.documentElement;
    return (
      Math.abs(r.left) <= 1 &&
      Math.abs(r.top) <= 1 &&
      r.right >= clientWidth - 1 &&
      r.right <= innerWidth + 1 &&
      r.bottom >= clientHeight - 1 &&
      r.bottom <= innerHeight + 1
    );
  };
  // A scroll area hiding part of its content.
  const scrolls = (area: Element) =>
    area.scrollHeight > area.clientHeight + 1 && /auto|scroll/.test(getComputedStyle(area).overflowY);

  // screen: found inside a full-viewport wrapper, so part of an overlay laid out against the whole
  // viewport (a full-screen viewer, a dialog on its backdrop).
  type Layer = { el: Element; r: DOMRect; screen: boolean };

  // What floats over the example: what is rendered next to the root, and what the root positions
  // out of its own flow — fixed, or absolutely positioned mostly outside the box it is positioned
  // against (a dropdown drawn under its trigger). Full-viewport wrappers (backdrops, portal hosts)
  // are searched rather than measured, unless they scroll part of their content: then they are
  // panels the viewport sizes (a drawer that takes a narrow frame's whole width). 1–2px helpers
  // (focus guards, live regions) are ignored.
  function layers(): Layer[] {
    const open: Layer[] = [];
    const visit = (el: Element, depth: number, screen: boolean) => {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      const r = el.getBoundingClientRect();
      const wrapper = coversViewport(r);
      const panel = () => [el, ...Array.from(el.querySelectorAll("*"))].some(scrolls);
      if (r.width > 2 && r.height > 2 && (!wrapper || panel())) {
        open.push({ el, r, screen });
        return;
      }
      if ((r.width > 0 && r.width <= 2) || (r.height > 0 && r.height <= 2) || depth >= 5) return;
      for (const child of Array.from(el.children)) visit(child, depth + 1, screen || wrapper);
    };
    for (const el of Array.from(document.body.children)) {
      if (el !== root && el.tagName !== "SCRIPT" && el.tagName !== "STYLE") visit(el, 0, false);
    }
    const floating: Element[] = [];
    for (const el of Array.from(root.querySelectorAll("*"))) {
      const style = getComputedStyle(el);
      if (style.position !== "absolute" && style.position !== "fixed") continue;
      if (floating.some((f) => f.contains(el))) continue;
      if (style.position === "fixed") {
        floating.push(el);
        visit(el, 0, false);
        continue;
      }
      const r = el.getBoundingClientRect();
      if (style.visibility === "hidden" || r.width <= 2 || r.height <= 2) continue;
      // One positioned against the page rather than a box of its own floats out of the example.
      const parent = (el as HTMLElement).offsetParent; // SVG elements have none: measured against the root
      const box = (parent && parent !== document.body ? parent : root).getBoundingClientRect();
      const outside = Math.max(0, box.top - r.top) + Math.max(0, r.bottom - box.bottom);
      // A badge or an icon overlapping its box's edge is part of it; what hangs below or above it is not.
      if (outside > gap && outside >= r.height / 2) {
        floating.push(el);
        open.push({ el, r, screen: false });
      }
    }
    return open;
  }

  // How close to the viewport's edge (px) a scroll area ends when the viewport sizes it: positioning
  // libraries keep a few px of padding from it.
  const EDGE = 32;
  // The room each squeezed layer asked for, kept while it stays open: shrinking back would squeeze
  // it again.
  const floors = new WeakMap<Element, number>();
  // Where each layer ended, and the viewport's height then. One whose bottom moved down as far as the
  // viewport grew is laid out against it (a full-screen viewer, a layer sized in vh): chased a few px
  // per request, it would creep to the cap, so it gets all the room the host allows at once.
  const lastSeen = new WeakMap<Element, { bottom: number; vh: number }>();

  // The height a layer squeezed to fit the frame, rather than cut off by it, would take in a window.
  // One exactly as tall as the viewport (a side drawer) takes all the host allows; one with a scroll
  // area hiding content and ending at the viewport's edge (a list sized to the room below its
  // trigger) takes what that area hides.
  function squeezedRoom({ el, r }: Layer, vh: number): number {
    if (Math.abs(r.top) <= 1 && Math.abs(r.bottom - vh) <= 1) return Infinity;
    let hidden = 0;
    for (const area of [el, ...Array.from(el.querySelectorAll("*"))]) {
      if (!scrolls(area)) continue;
      const a = area.getBoundingClientRect();
      const atEdge = (a.bottom >= vh - EDGE && a.bottom <= vh + 1) || (a.top >= -1 && a.top <= EDGE);
      if (atEdge) hidden = Math.max(hidden, area.scrollHeight - area.clientHeight);
    }
    return hidden ? vh + hidden + EDGE : 0;
  }

  function requiredSize(open: Layer[]) {
    const vh = innerHeight;
    const vw = document.documentElement.clientWidth;
    let need = 0;
    let overflow = false;
    let topOverflow = 0;
    let cutOffAtTop = 0;
    let { left, right } = sides;
    for (const layer of open) {
      const r = layer.r;
      // Cut off at a side, not out of view: the frame reaches that much further on that side. An
      // overlay laid out against the whole viewport gets the page's whole width instead, as it
      // would have in a window.
      if (r.right > 0 && r.left < vw && (r.left < -1 || r.right > vw + 1)) {
        overflow = true;
        if (layer.screen) left = right = Infinity;
        if (r.left < -1) left = Math.max(left, extent.left - r.left + gap);
        if (r.right > vw + 1) right = Math.max(right, extent.right + r.right - vw + gap);
      }
      if (r.bottom > vh) overflow = true;
      if (r.top < 0) {
        overflow = true;
        topOverflow = Math.max(topOverflow, -r.top);
        cutOffAtTop = Math.max(cutOffAtTop, r.height);
      }
      need = Math.max(need, r.bottom + gap, r.height + 2 * gap);
      const seen = lastSeen.get(layer.el);
      if (seen && vh > seen.vh + 1 && r.bottom - seen.bottom >= vh - seen.vh - 1) floors.set(layer.el, Infinity);
      lastSeen.set(layer.el, { bottom: r.bottom, vh });
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
    return { overflow, need: Math.ceil(need), topOverflow, left: Math.ceil(left), right: Math.ceil(right) };
  }

  function freeze() {
    frozenViewport = { width: innerWidth, height: innerHeight };
    freezeStyle = document.createElement("style");
    freezeStyle.setAttribute("data-overlay-frame", "frozen");
    const scrollbar = (shown: boolean) => (shown ? "scroll" : "hidden");
    freezeStyle.textContent =
      `html{overflow-x:${scrollbar(rest.scrollbarX)}!important;overflow-y:${scrollbar(rest.scrollbarY)}!important}` +
      "body{overflow:hidden!important}";
    document.head.appendChild(freezeStyle);

    if (scrollX !== rest.x || scrollY !== rest.y) scrollTo(rest.x, rest.y);
    const r = root.getBoundingClientRect();
    pin = { top: r.top + rest.y, left: r.left + rest.x, width: r.width, height: r.height };
    // The root can be matched by any selector; pin it through an attribute of our own.
    root.setAttribute(PIN_ATTRIBUTE, "");
    writePin();
  }

  // The frozen document: no scrollbars (a resting vertical one's gutter kept), the root pinned where
  // it was painted, moved right by as much as the frame reaches past its resting left side.
  function writePin() {
    if (!freezeStyle || !pin) return;
    freezeStyle.textContent =
      "html,body{overflow:hidden!important}" +
      (rest.scrollbarY ? "html{scrollbar-gutter:stable!important}" : "") +
      "html,body{height:auto!important}" +
      // Keep the document tall (wide) enough for the resting scroll offset to stay valid.
      `html{min-height:calc(100% + ${rest.y}px)!important` +
      (rest.x ? `;min-width:calc(100% + ${rest.x}px)!important` : "") +
      "}body{min-height:0!important}" +
      `[${PIN_ATTRIBUTE}]{position:absolute!important;margin:0!important;box-sizing:border-box!important;` +
      `top:${pin.top}px!important;left:${pin.left + extent.left}px!important;` +
      `width:${pin.width}px!important;height:${pin.height}px!important;min-height:0!important}`;
  }

  function unfreeze() {
    clearTimeout(unfreezeTimer);
    if (!freezeStyle) return;
    freezeStyle.remove();
    freezeStyle = null;
    root.removeAttribute(PIN_ATTRIBUTE);
    pin = null;
    frozenViewport = { width: 0, height: 0 };
    lastTopOverflow = null;
  }

  // The host has put the frame back at its resting size.
  const backToRest = () =>
    Math.abs(innerWidth - frozenViewport.width) <= 1 && Math.abs(innerHeight - frozenViewport.height) <= 1;

  // Returns whether the frame's sides moved.
  function setExtent(next: OverlayFrameExtent | undefined): boolean {
    if (!next || (next.left === extent.left && next.right === extent.right)) return false;
    extent = { left: next.left, right: next.right };
    writePin();
    return true;
  }

  const sameSize = (a: OverlayFrameSize | null | undefined, b: OverlayFrameSize | null) =>
    a === b || (!!a && !!b && a.height === b.height && a.left === b.left && a.right === b.right);

  // Returns whether the frame's sides moved, as far as is known at once (same-origin).
  function send(size: OverlayFrameSize | null): boolean {
    if (sameSize(lastSize, size)) return false;
    if (size !== null) {
      const now = Date.now();
      requestTimes = requestTimes.filter((t) => now - t < 1000);
      if (requestTimes.length >= options.maxRequestsPerSecond) {
        // Measure again once the oldest request leaves the window, so the latest need is not lost.
        clearTimeout(retryTimer);
        retryTimer = window.setTimeout(schedule, 1000 - (now - requestTimes[0]));
        return false;
      }
      requestTimes.push(now);
    }
    lastSize = size;
    const host = (window as unknown as Record<string, unknown>)[options.hostGlobal] as
      | { requestSize?: (size: OverlayFrameSize | null) => OverlayFrameExtent }
      | undefined;
    if (host && typeof host.requestSize === "function") return setExtent(host.requestSize(size));
    parent.postMessage({ type: options.messageType, size }, hostOrigin);
    // The host answers with the extent it applied (extentType); at rest there is none.
    return size === null && setExtent({ left: 0, right: 0 });
  }

  function measure() {
    scheduled = false;
    const open = layers();
    openInRoot = open.some(({ el }) => root.contains(el));
    if (!open.length) {
      sides = { left: 0, right: 0 };
      if (!freezeStyle) {
        rest = readRest();
        return;
      }
      send(null);
      // Release the root once the host has restored the resting size (or shortly after);
      // releasing it earlier would re-centre the example in the still-larger frame.
      clearTimeout(unfreezeTimer);
      unfreezeTimer = window.setTimeout(unfreeze, 400);
      if (backToRest()) unfreeze();
      return;
    }

    let result = requiredSize(open);
    if (!freezeStyle && !result.overflow) return;
    clearTimeout(unfreezeTimer);
    const freezing = !freezeStyle;
    if (freezing) {
      freeze();
      result = requiredSize(layers());
    }
    lastTopOverflow = result.topOverflow > 0 ? result.topOverflow : null;
    sides = { left: result.left, right: result.right };
    const moved = send({ height: result.need, left: result.left, right: result.right });

    // A new viewport (or, for a frame extended to the left, the example moved within it): the overlay
    // is re-placed now rather than in the next frame.
    if (freezing || moved) {
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
    // measure per frame): a layer re-placed after one of them mutates itself. Unless the layer is
    // inside the root, where its own changes (and its closing) happen.
    if (freezeStyle && !openInRoot && records.every((record) => root.contains(record.target))) return;
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
    if (freezeStyle && lastSize === null && backToRest()) unfreeze();
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
  // (if any) collapsed the frame, so the size is back before that collapse is ever laid out.
  function sync() {
    lastSize = undefined;
    measure();
  }

  (window as unknown as Record<string, unknown>)[options.guestGlobal] = { outsidePress, sync };
  addEventListener("message", (event) => {
    const data = event.data as { type?: string; left?: unknown; right?: unknown } | null;
    if (event.source !== parent) return;
    if (data?.type === options.outsidePressType) outsidePress();
    else if (data?.type === options.syncType) sync();
    else if (data?.type === options.extentType) {
      // The cross-origin answer to a request: the example moves with the frame's left side.
      if (setExtent({ left: Number(data.left) || 0, right: Number(data.right) || 0 })) dispatchEvent(new Event("resize"));
    }
  });
}

/** Inline script for the framed document; place it after the root element. */
export function overlayFrameGuestScript(options: Partial<OverlayFrameGuestOptions> = {}): string {
  // `<` escaped, so no value can end the script element (`</script>`) or open a comment (`<!--`).
  const config = JSON.stringify({ ...DEFAULT_GUEST_OPTIONS, ...options }).replace(/</g, "\\u003c");
  return `<script>(${overlayFrameGuest.toString()})(${config});<\/script>`;
}
