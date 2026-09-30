// A square rounded by the radius token.
export const Example = ({ of: radius }: { of: string }) => (
  <div
    style={{
      width: "64px",
      height: "64px",
      backgroundColor: "var(--color-indigo)",
      borderRadius: `var(--radius-${radius})`,
    }}
  />
);
