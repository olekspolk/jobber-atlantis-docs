import type { ReactNode } from "react";
import { useAtlantisPreview } from "./AtlantisPreviewProvider";

export const AtlantisPreviewViewer = () => {
  const { iframe } = useAtlantisPreview();

  return (
    <iframe
      ref={iframe}
      title="Live example preview"
      style={{ width: "100%", border: "none", display: "block", minHeight: "200px" }}
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
