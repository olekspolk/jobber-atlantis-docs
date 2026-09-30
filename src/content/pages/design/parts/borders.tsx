import type { CSSProperties } from "react";

const baseStyle = (size: string): CSSProperties => ({
  width: "100%",
  height: "var(--space-minuscule)",
  borderBottomStyle: "solid",
  borderBottomWidth: `var(--border-${size})`,
  borderBottomColor: "var(--color-grey--lighter)",
});

// A line drawn with the border token, and the token's value.
export const Example = ({ of: size }: { of: string }) => <div style={baseStyle(size)} />;

export const BorderSize = ({ of: size }: { of: string }) =>
  getComputedStyle(document.documentElement).getPropertyValue(`--border-${size}`);
