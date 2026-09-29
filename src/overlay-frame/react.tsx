import {
  type CSSProperties,
  type IframeHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { type OverlayFrameHostOptions, attachOverlayFrameHost } from "./host";

export type OverlayFrameOptions = Omit<OverlayFrameHostOptions, "slot">;

const SLOT_STYLE: CSSProperties = { position: "relative", width: "100%" };
const FRAME_STYLE: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  border: "none",
  display: "block",
};

/**
 * For markup you render yourself: put `slotRef`/`slotStyle` on a wrapper and `frameRef`/`frameStyle`
 * on the iframe inside it. The host is attached for as long as the component is mounted.
 */
export function useOverlayFrame(options: OverlayFrameOptions = {}) {
  const slotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);
  // The options are primitives, compared by value: a new object with the same values keeps the host.
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    const frame = frameRef.current;
    const slot = slotRef.current;
    if (!frame || !slot) return;
    return attachOverlayFrameHost(frame, { ...options, slot });
  }, [optionsKey]);

  return { slotRef, frameRef, slotStyle: SLOT_STYLE, frameStyle: FRAME_STYLE };
}

export interface OverlayFrameProps extends IframeHTMLAttributes<HTMLIFrameElement>, OverlayFrameOptions {
  /** Height the slot reserves until the frame has a size of its own. */
  readonly initialHeight?: number;
}

/** Drop-in replacement for an `<iframe>` whose document may open overlays taller than the frame. */
export const OverlayFrame = forwardRef<HTMLIFrameElement, OverlayFrameProps>(function OverlayFrame(
  {
    initialHeight = 200,
    maxViewportFraction,
    maxHeight,
    expandedZIndex,
    dismissOnOutsidePress,
    guestOrigin,
    messageType,
    hostGlobal,
    outsidePressType,
    syncType,
    guestGlobal,
    style,
    ...iframeProps
  },
  ref,
) {
  const { slotRef, frameRef, slotStyle, frameStyle } = useOverlayFrame({
    maxViewportFraction,
    maxHeight,
    expandedZIndex,
    dismissOnOutsidePress,
    guestOrigin,
    messageType,
    hostGlobal,
    outsidePressType,
    syncType,
    guestGlobal,
  });
  useImperativeHandle(ref, () => frameRef.current as HTMLIFrameElement, [frameRef]);

  return (
    <div ref={slotRef} style={{ ...slotStyle, height: initialHeight }}>
      <iframe ref={frameRef} {...iframeProps} style={{ ...frameStyle, ...style }} />
    </div>
  );
});
