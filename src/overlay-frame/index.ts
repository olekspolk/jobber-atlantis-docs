// An iframe whose document can open overlays (menus, popovers, tooltips, dialogs) taller than the
// frame: while one is open, the frame grows over the page instead of clipping it.
//
//   guest (inside the framed document):  overlayFrameGuestScript()  — or overlayFrameGuest() in a bundle
//   host (the embedding page):           <OverlayFrame> / useOverlayFrame() for React,
//                                        attachOverlayFrameHost() for anything else
export {
  OVERLAY_FRAME_PROTOCOL,
  type OverlayFrameGuestApi,
  type OverlayFrameHostApi,
  type OverlayFrameSizeMessage,
} from "./protocol";
export {
  DEFAULT_GUEST_OPTIONS,
  overlayFrameGuest,
  overlayFrameGuestScript,
  type OverlayFrameGuestOptions,
} from "./guest";
export { attachOverlayFrameHost, type OverlayFrameHostOptions } from "./host";
export { OverlayFrame, useOverlayFrame, type OverlayFrameOptions, type OverlayFrameProps } from "./react";
