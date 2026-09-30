// A square faded by the opacity token.
export const Opacity = ({ of: opacity }: { of: string }) => (
  <div
    style={{
      width: "var(--space-large)",
      height: "var(--space-large)",
      backgroundColor: "var(--color-border)",
      opacity: `var(--opacity-${opacity})`,
    }}
  />
);
