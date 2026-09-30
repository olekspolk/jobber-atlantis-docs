// A surface with the shadow token, and an elevation token's value.
export const Example = ({ of: shadow }: { of: string }) => (
  <div
    style={{
      width: "100%",
      height: "var(--space-largest)",
      backgroundColor: "var(--color-white)",
      boxShadow: `var(--shadow-${shadow})`,
    }}
  />
);

export const Value = ({ of: type }: { of: string }) => (
  <div>{getComputedStyle(document.documentElement).getPropertyValue(`--elevation-${type}`)}</div>
);
