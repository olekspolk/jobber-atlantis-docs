/**
 * Contract between the document inside the frame (the guest) and the page that embeds it (the host).
 *
 * Guest → host: the room the guest's open overlays need (`null` once nothing floats): the frame's
 * height (`Infinity`: all the host allows) and how far past its resting sides it should reach. The
 * guest calls the host synchronously through `hostGlobal`, which the host installs on the frame's
 * window when both are same-origin; that lets the new size be laid out in the same frame as the
 * overlay, so a cut-off overlay is never painted.
 *
 * Host → guest: how far it did extend the frame past its resting sides, within the room the page
 * has (the return value of `requestSize`); the guest keeps its content where it was painted. A
 * press outside the frame: it never reaches the guest's document, so overlays that close on an
 * outside press would stay open; the host calls `guestGlobal.outsidePress()`. And on attaching,
 * `guestGlobal.sync()`: the guest repeats the size it needs, which a host attached late (or
 * re-attached while an overlay is open) has not heard.
 *
 * `messageType` / `extentType` / `outsidePressType` / `syncType` are the postMessage fallbacks for
 * cross-origin frames.
 */
export const OVERLAY_FRAME_PROTOCOL = {
  messageType: "overlay-frame:size",
  extentType: "overlay-frame:extent",
  hostGlobal: "__overlayFrameHost",
  outsidePressType: "overlay-frame:outside-press",
  syncType: "overlay-frame:sync",
  guestGlobal: "__overlayFrameGuest",
} as const;

/** The frame's size the guest asks for: its height, and px past its resting left and right sides. */
export interface OverlayFrameSize {
  readonly height: number;
  readonly left: number;
  readonly right: number;
}

/** How far past its resting sides the host extended the frame, in px. */
export interface OverlayFrameExtent {
  readonly left: number;
  readonly right: number;
}

export interface OverlayFrameHostApi {
  requestSize(size: OverlayFrameSize | null): OverlayFrameExtent;
}

export interface OverlayFrameGuestApi {
  outsidePress(): void;
  sync(): void;
}

export interface OverlayFrameSizeMessage {
  readonly type: string;
  readonly size: OverlayFrameSize | null;
}

export interface OverlayFrameExtentMessage extends OverlayFrameExtent {
  readonly type: string;
}
