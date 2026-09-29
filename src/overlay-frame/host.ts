import {
  OVERLAY_FRAME_PROTOCOL,
  type OverlayFrameGuestApi,
  type OverlayFrameHostApi,
  type OverlayFrameSizeMessage,
} from "./protocol";

export interface OverlayFrameHostOptions {
  /**
   * Keeps the frame's resting height in the page layout. The frame is absolutely positioned inside
   * it, so when it grows it covers the content below instead of pushing it down.
   */
  readonly slot: HTMLElement;
  /** Largest height the frame may take, as a fraction of the window height. */
  readonly maxViewportFraction?: number;
  /** Largest height the frame may take, in px (whichever of the two is lower applies). */
  readonly maxHeight?: number;
  /** z-index while the frame is taller than its slot: above the page, below the page's own modals. */
  readonly expandedZIndex?: string;
  /** Report presses on the page to the guest, so its overlays close on an outside press. */
  readonly dismissOnOutsidePress?: boolean;
  /** Origin of the framed document, for the postMessage fallback. Defaults to this page's origin. */
  readonly guestOrigin?: string;
  readonly messageType?: string;
  readonly hostGlobal?: string;
  readonly outsidePressType?: string;
  readonly syncType?: string;
  readonly guestGlobal?: string;
}

type FrameWindow = Window & Record<string, unknown>;

// Room left between the window's bottom and a frame given all the room there is.
const WINDOW_GAP = 16;

/**
 * Host side: applies the height the framed document asks for while it shows an overlay, and
 * restores the resting height when it stops. The frame's document is transparent, so only the
 * overlay shows over the page. Presses on the page are reported to the guest, which treats them as
 * presses outside its overlays. Returns a function that detaches everything.
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
    hostGlobal = OVERLAY_FRAME_PROTOCOL.hostGlobal,
    outsidePressType = OVERLAY_FRAME_PROTOCOL.outsidePressType,
    syncType = OVERLAY_FRAME_PROTOCOL.syncType,
    guestGlobal = OVERLAY_FRAME_PROTOCOL.guestGlobal,
  }: OverlayFrameHostOptions,
): () => void {
  let restingHeight = 0;
  let appliedHeight = 0;
  let expanded = false;
  let restingResize = "";

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

  const applyHeight = (height: number) => {
    const expanding = height > restingHeight + 1;
    appliedHeight = height;
    frame.style.height = `${height}px`;
    if (expanding !== expanded) {
      frame.style.zIndex = expanding ? expandedZIndex : "";
      // The resize handle would float over the page at the bottom of the expanded frame.
      if (expanding) restingResize = frame.style.resize;
      frame.style.resize = expanding ? "none" : restingResize;
      frame.dataset.expanded = String(expanding);
      expanded = expanding;
    }
  };

  const requestHeight = (need: number | null) => {
    if (!restingHeight) restingHeight = currentHeight();
    if (need === null) {
      applyHeight(restingHeight);
      return;
    }
    const cap = Math.max(restingHeight, Math.min(maxHeight, Math.round(window.innerHeight * maxViewportFraction)));
    // All there is (a side drawer, a full-screen viewer): down to the window's bottom, so it stays in view.
    const room = need === Infinity ? Math.floor(window.innerHeight - frame.getBoundingClientRect().top - WINDOW_GAP) : need;
    applyHeight(Math.min(cap, Math.max(restingHeight, room)));
  };

  // Synchronous channel (same origin). document.open() keeps the window object, but re-install
  // after each load in case the embedder navigates the frame.
  const host: OverlayFrameHostApi = { requestHeight };
  const install = () => {
    const win = frameWindow();
    if (win) win[hostGlobal] = host;
  };

  const onMessage = (event: MessageEvent<OverlayFrameSizeMessage | unknown>) => {
    if (event.source !== frame.contentWindow || event.origin !== guestOrigin) return;
    const data = event.data as Partial<OverlayFrameSizeMessage> | null;
    if (data && typeof data === "object" && data.type === messageType) requestHeight(data.need ?? null);
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
    const height = currentHeight();
    if (appliedHeight && Math.abs(height - appliedHeight) <= 1) return;
    restingHeight = height;
    slot.style.height = `${height}px`;
  });

  const page = frame.ownerDocument;
  install();
  frame.addEventListener("load", install);
  window.addEventListener("message", onMessage);
  if (dismissOnOutsidePress) page.addEventListener("pointerdown", onPagePress, true);
  observer.observe(frame);
  // A guest that sent its height before this host attached (a late attach, or a re-attach while an
  // overlay is open) would not send the same height again.
  toGuest("sync", syncType);

  return () => {
    frame.removeEventListener("load", install);
    window.removeEventListener("message", onMessage);
    page.removeEventListener("pointerdown", onPagePress, true);
    observer.disconnect();
    const win = frameWindow();
    if (win?.[hostGlobal] === host) delete win[hostGlobal];
    // Leave the frame at rest: a host attached later would take the expanded height for the resting one.
    if (expanded) applyHeight(restingHeight);
  };
}
