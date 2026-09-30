// A bar as wide as the space token, and the token in pixels.
export const Example = ({ of: size }: { of: string }) => (
  <div style={{ width: `var(--space-${size})`, height: "var(--space-base)", backgroundColor: "var(--color-indigo)" }} />
);

export const Height = ({ of: size }: { of: string }) => {
  const element = document.createElement("div");
  element.style.height = `var(--space-${size})`;
  document.body.appendChild(element);
  const value = getComputedStyle(element).height;
  element.remove();
  return value;
};
