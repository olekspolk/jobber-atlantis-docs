import type { ReactNode } from "react";
import { OverlayFrame } from "../overlay-frame";
import { getPlatformForComponentType } from "../site/componentTypes";
import { useAtlantisPreview } from "./AtlantisPreviewProvider";

// The web and the mobile example each have a frame, as on the site; the one for the example shown
// is visible. Both let their overlays extend past the frame.
export const AtlantisPreviewViewer = ({ maxHeight }: { maxHeight?: number }) => {
  const { iframe, iframeMobile, type } = useAtlantisPreview();
  const platform = getPlatformForComponentType(type);
  const frames = [
    { ref: iframe, platform: "web", style: { minHeight: "200px" } },
    { ref: iframeMobile, platform: "mobile", style: { minHeight: "200px", borderRadius: "var(--radius-base)" } },
  ] as const;

  return (
    <>
      {frames.map(({ ref, platform: framePlatform, style }) => (
        <div key={framePlatform} style={{ display: platform === framePlatform ? "block" : "none", width: "100%" }}>
          <OverlayFrame
            ref={ref}
            title={framePlatform === "web" ? "Live example preview" : "Live mobile example preview"}
            // Above page content (CodeMirror's gutters use z-index 200), below Atlantis modals and toasts.
            expandedZIndex="calc(var(--elevation-modal) - 1)"
            maxHeight={maxHeight}
            style={style}
          />
        </div>
      ))}
    </>
  );
};

export const CodePreviewWindow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: "flex",
      gap: "var(--space-small)",
      width: "100%",
      boxSizing: "border-box",
      padding: "var(--space-small)",
      borderRadius: "var(--radius-base)",
      backgroundColor: "var(--color-surface--background--subtle)",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);
