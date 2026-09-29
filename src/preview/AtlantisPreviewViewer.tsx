import type { ReactNode } from "react";
import { OverlayFrame } from "../overlay-frame";
import { useAtlantisPreview } from "./AtlantisPreviewProvider";

export const AtlantisPreviewViewer = ({ maxHeight }: { maxHeight?: number }) => {
  const { iframe } = useAtlantisPreview();

  return (
    <OverlayFrame
      ref={iframe}
      title="Live example preview"
      // Above page content (CodeMirror's gutters use z-index 200), below Atlantis modals and toasts.
      expandedZIndex="calc(var(--elevation-modal) - 1)"
      maxHeight={maxHeight}
      style={{ minHeight: "200px" }}
    />
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
