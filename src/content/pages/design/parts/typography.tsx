import { iosTokens } from "@jobber/design";

// Font sizes and line heights in points, as numbers.
const ios = (name: string) => (iosTokens as Record<string, unknown>)[`typography--${name}`] as number;

// Web: text in the font size token, and the token in pixels.
export const Example = ({ of: size }: { of: string }) => (
  <div style={{ fontSize: `var(--typography--fontSize-${size})`, fontFamily: "Inter" }}>{size}</div>
);

export const PixelSize = ({ of: size }: { of: string }) => {
  const element = document.createElement("div");
  element.style.fontSize = `var(--typography--fontSize-${size})`;
  document.body.appendChild(element);
  const value = getComputedStyle(element).fontSize;
  element.remove();
  return value;
};

// Mobile: the same, from the iOS tokens.
export const MobileExample = ({ of: mobileSize }: { of: string }) => (
  <div style={{ fontSize: ios(`fontSize-${mobileSize}`), fontFamily: "Inter" }}>{mobileSize}</div>
);

export const MobilePixelSize = ({ of: mobileSize }: { of: string }) => `${ios(`fontSize-${mobileSize}`)}px`;

// Web: a paragraph in the line height token, and the token as a ratio of the font size.
export const Visual = ({ of: size }: { of: string }) => (
  <div style={{ lineHeight: `var(--typography--lineHeight-${size})`, fontFamily: "Inter", fontSize: "14px" }}>
    Line-height, or leading, is the space between subsequent lines of type. The line-heights in the Heading and Text
    components are optimized for each variation's unique combination of...
  </div>
);

export const Value = ({ of: size }: { of: string }) => {
  const element = document.createElement("div");
  element.style.lineHeight = `var(--typography--lineHeight-${size})`;
  document.body.appendChild(element);
  const value = parseFloat(getComputedStyle(element).lineHeight) / parseFloat(getComputedStyle(element).fontSize);
  element.remove();
  return parseFloat(value.toFixed(3));
};

// Mobile line heights.
export const MobileLineHeightExample = ({ of: mobileLineHeight }: { of: string }) => (
  <div style={{ lineHeight: `${ios(`lineHeight-${mobileLineHeight}`)}px`, fontFamily: "Inter" }}>
    Line-height, or leading, is the space between subsequent lines of type...
  </div>
);

export const MobileLineHeightPixelSize = ({ of: mobileSize }: { of: string }) =>
  `${ios(`lineHeight-${mobileSize}`)}px`;
