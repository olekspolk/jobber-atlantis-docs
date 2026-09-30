import {
  OVERLAY_FRAME_PROTOCOL,
  type OverlayFrameExtent,
  type OverlayFrameExtentMessage,
  type OverlayFrameGuestApi,
  type OverlayFrameHostApi,
  type OverlayFrameSize,
  type OverlayFrameSizeMessage,
} from "./protocol";

export interface OverlayFrameHostOptions {
  /**
   * Keeps the frame's resting size in the page layout. The frame is absolutely positioned inside
   * it and fills its width, so when it grows it covers the content around it instead of moving it.
   */
  readonly slot: HTMLElement;
  /** Largest height the frame may take, as a fraction of the window height. */
  readonly maxViewportFraction?: number;
  /** Largest height the frame may take, in px (whichever of the two is lower applies). */
  readonly maxHeight?: number;
  /** z-index while the frame is larger than its slot: above the page, below the page's own modals. */
  readonly expandedZIndex?: string;
  /** Report presses on the page to the guest, so its overlays close on an outside press. */
  readonly dismissOnOutsidePress?: boolean;
  /** Origin of the framed document, for the postMessage fallback. Defaults to this page's origin. */
  readonly guestOrigin?: string;
  readonly messageType?: string;
  readonly extentType?: string;
  readonly hostGlobal?: string;
  readonly outsidePressType?: string;
  readonly syncType?: string;
  readonly guestGlobal?: string;
}

type FrameWindow = Window & Record<string, unknown>;

// Room left between the window's bottom and a frame given all the room there is.
const WINDOW_GAP = 16;
const AT_REST: OverlayFrameExtent = { left: 0, right: 0 };

/**
 * Host side: applies the size the framed document asks for while it shows an overlay — taller, and
 * wider on either side, as far as the page's visible area reaches — and restores the resting size
 * when it stops. The frame's document is transparent, so only the overlay shows over the page.
 * Presses on the page are reported to the guest, which treats them as presses outside its overlays.
 * Returns a function that detaches everything.
 *
 * The resting height is whatever the frame has when it is not expanded: set by the embedder, or by
 * the user dragging the frame's resize handle (hidden while expanded). The slot follows it.
 */
export function attachOverlayFrameHost(
  frame: HTMLIFrameElement,
  {
    slot,
    maxViewportFraction = 0.9,
    maxHeight = Infinity,
    expandedZIndex = "1000",
    dismissOnOutsidePress = true,
    guestOrigin = window.location.origin,
    messageType = OVERLAY_FRAME_PROTOCOL.messageType,
    extentType = OVERLAY_FRAME_PROTOCOL.extentType,
    hostGlobal = OVERLAY_FRAME_PROTOCOL.hostGlobal,
    outsidePressType = OVERLAY_FRAME_PROTOCOL.outsidePressType,
    syncType = OVERLAY_FRAME_PROTOCOL.syncType,
    guestGlobal = OVERLAY_FRAME_PROTOCOL.guestGlobal,
  }: OverlayFrameHostOptions,
): () => void {
  const page = frame.ownerDocument;
  let restingHeight = 0;
  let appliedHeight = 0;
  let extent = AT_REST;
  let expanded = false;
  // The frame's own inline values, put back once it is at rest.
  let resting = { resize: "", left: "", width: "" };

  // Same-origin access to the frame's window; null for a cross-origin frame.
  const frameWindow = (): FrameWindow | null => {
    try {
      const win = frame.contentWindow as FrameWindow | null;
      if (win) void win.document; // throws for a cross-origin frame
      return win;
    } catch {
      return null;
    }
  };

  const currentHeight = () => frame.getBoundingClientRect().height;

  // How far past the slot's sides the frame can reach and still be seen: within the window, and
  // within every ancestor that clips or scrolls its content (inside its scrollbars). Further out, an
  // overlay would be cut off by the page itself, and the frame would make the page scroll sideways.
  const sideRoom = (): OverlayFrameExtent => {
    let left = 0;
    let right = page.documentElement.clientWidth;
    for (let el = slot.parentElement; el && el !== page.documentElement; el = el.parentElement) {
      const { overflowX, display } = getComputedStyle(el);
      // Overflow applies to boxes that hold their content: not to inline or `contents` elements.
      if (overflowX === "visible" || display === "inline" || display === "contents") continue;
      const r = el.getBoundingClientRect();
      left = Math.max(left, r.left + el.clientLeft);
      right = Math.min(right, r.left + el.clientLeft + el.clientWidth);
    }
    const s = slot.getBoundingClientRect();
    return { left: Math.max(0, Math.floor(s.left - left)), right: Math.max(0, Math.floor(right - s.right)) };
  };

  const apply = (height: number, sides: OverlayFrameExtent) => {
    const expanding = height > restingHeight + 1 || sides.left > 0 || sides.right > 0;
    appliedHeight = height;
    frame.style.height = `${height}px`;
    if (expanding !== expanded) {
      if (expanding) resting = { resize: frame.style.resize, left: frame.style.left, width: frame.style.width };
      frame.style.zIndex = expanding ? expandedZIndex : "";
      // The resize handle would float over the page at the bottom of the expanded frame.
      frame.style.resize = expanding ? "none" : resting.resize;
      frame.dataset.expanded = String(expanding);
      expanded = expanding;
    }
    if (sides.left !== extent.left || sides.right !== extent.right) {
      extent = sides;
      // At rest the frame fills the slot's width (left: 0, width: 100%).
      const wider = sides.left + sides.right > 0;
      frame.style.left = wider ? `${-sides.left}px` : resting.left;
      frame.style.width = wider ? `calc(100% + ${sides.left + sides.right}px)` : resting.width;
    }
  };

  const requestSize = (size: OverlayFrameSize | null): OverlayFrameExtent => {
    if (!restingHeight) restingHeight = currentHeight();
    if (size === null) {
      apply(restingHeight, AT_REST);
      return extent;
    }
    const cap = Math.max(restingHeight, Math.min(maxHeight, Math.round(window.innerHeight * maxViewportFraction)));
    // All there is (a side drawer, a full-screen viewer): down to the window's bottom, so it stays in view.
    const height =
      size.height === Infinity ? Math.floor(window.innerHeight - frame.getBoundingClientRect().top - WINDOW_GAP) : size.height;
    const room = sideRoom();
    apply(Math.min(cap, Math.max(restingHeight, height)), {
      left: Math.min(room.left, Math.max(0, Math.ceil(size.left))),
      right: Math.min(room.right, Math.max(0, Math.ceil(size.right))),
    });
    return extent;
  };

  // Synchronous channel (same origin). document.open() keeps the window object, but re-install
  // after each load in case the embedder navigates the frame.
  const host: OverlayFrameHostApi = { requestSize };
  const install = () => {
    const win = frameWindow();
    if (win) win[hostGlobal] = host;
  };

  const onMessage = (event: MessageEvent<OverlayFrameSizeMessage | unknown>) => {
    if (event.source !== frame.contentWindow || event.origin !== guestOrigin) return;
    const data = event.data as Partial<OverlayFrameSizeMessage> | null;
    if (!data || typeof data !== "object" || data.type !== messageType) return;
    const { left, right } = requestSize(data.size ?? null);
    const reply: OverlayFrameExtentMessage = { type: extentType, left, right };
    frame.contentWindow?.postMessage(reply, guestOrigin);
  };

  // Calls the guest directly when same-origin (and its script has run), else posts the message.
  const toGuest = (method: keyof OverlayFrameGuestApi, type: string) => {
    const guest = frameWindow()?.[guestGlobal] as OverlayFrameGuestApi | undefined;
    if (guest && typeof guest[method] === "function") guest[method]();
    else frame.contentWindow?.postMessage({ type }, guestOrigin);
  };

  // Every press that reaches this document is outside the frame (presses inside it go to its own
  // document). Capture phase, so the page stopping propagation does not hide it.
  const onPagePress = () => toGuest("outsidePress", outsidePressType);

  const observer = new ResizeObserver(() => {
    // A frame hidden with display: none (behind an inactive tab, say) has no box: its 0px is not a
    // resting height, and the slot keeps its size for when the frame shows again.
    if (!frame.getClientRects().length) return;
    const height = currentHeight();
    if (appliedHeight && Math.abs(height - appliedHeight) <= 1) return;
    restingHeight = height;
    slot.style.height = `${height}px`;
  });

  install();
  frame.addEventListener("load", install);
  window.addEventListener("message", onMessage);
  if (dismissOnOutsidePress) page.addEventListener("pointerdown", onPagePress, true);
  observer.observe(frame);
  // A guest that sent its size before this host attached (a late attach, or a re-attach while an
  // overlay is open) would not send the same size again.
  toGuest("sync", syncType);

  return () => {
    frame.removeEventListener("load", install);
    window.removeEventListener("message", onMessage);
    page.removeEventListener("pointerdown", onPagePress, true);
    observer.disconnect();
    const win = frameWindow();
    if (win?.[hostGlobal] === host) delete win[hostGlobal];
    // Leave the frame at rest: a host attached later would take the expanded size for the resting one.
    if (expanded) apply(restingHeight, AT_REST);
  };
}
