/**
 * Contract between the document inside the frame (the guest) and the page that embeds it (the host).
 *
 * Guest → host: the height the guest's open overlays need (`null` once nothing floats). The guest
 * calls the host synchronously through `hostGlobal`, which the host installs on the frame's window
 * when both are same-origin; that lets the new height be laid out in the same frame as the overlay,
 * so a cut-off overlay is never painted.
 *
 * Host → guest: a press outside the frame. It never reaches the guest's document, so overlays that
 * close on an outside press would stay open; the host calls `guestGlobal.outsidePress()`. And on
 * attaching, `guestGlobal.sync()`: the guest repeats the height it needs, which a host attached late
 * (or re-attached while an overlay is open) has not heard.
 *
 * `messageType` / `outsidePressType` / `syncType` are the postMessage fallbacks for cross-origin frames.
 */
export const OVERLAY_FRAME_PROTOCOL = {
  messageType: "overlay-frame:size",
  hostGlobal: "__overlayFrameHost",
  outsidePressType: "overlay-frame:outside-press",
  syncType: "overlay-frame:sync",
  guestGlobal: "__overlayFrameGuest",
} as const;

export interface OverlayFrameHostApi {
  requestHeight(need: number | null): void;
}

export interface OverlayFrameGuestApi {
  outsidePress(): void;
  sync(): void;
}

export interface OverlayFrameSizeMessage {
  readonly type: string;
  readonly need: number | null;
}
