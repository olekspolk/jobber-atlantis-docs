import { Button } from "@jobber/components/Button";
import { Cluster } from "@jobber/components/Cluster";
import { Content } from "@jobber/components/Content";
import { Flex } from "@jobber/components/Flex";
import { InputText } from "@jobber/components/InputText";
import { Stack } from "@jobber/components/Stack";
import { Text } from "@jobber/components/Text";
import { Tooltip } from "@jobber/components/Tooltip";
import { Typography } from "@jobber/components/Typography";
import { allColors, darkTokens } from "@jobber/design";
import { type CSSProperties, useMemo, useState } from "react";
import { copyToClipboard } from "../../../../components/copyToClipboard";
import styles from "./colors.module.css";

// A swatch per color token, with its name and a button that copies it as var(--token).
export const StorybookColorSwatches = ({ colors }: { colors: string[] }) => (
  <Content>
    {colors.map((color) => (
      <Color color={color} key={color} />
    ))}
  </Content>
);

function Color({ color }: { color: string }) {
  const handleClick = () =>
    copyToClipboard(`var(${color})`, `Color ${color} copied to clipboard`, `Unable to copy ${color}`);
  return (
    <Flex gap="small" align="center" template={["shrink", "shrink"]}>
      <div style={{ backgroundColor: `var(${color})` }} className={styles.swatch} />
      <Content spacing="small">
        <Flex gap="smaller" align="center" template={["shrink", "shrink"]}>
          <pre className={styles.pre}>{color}</pre>
          <Tooltip message="Copy">
            <Button size="small" variation="subtle" type="tertiary" icon="copy" onClick={handleClick} ariaLabel="Copy" />
          </Tooltip>
        </Flex>
      </Content>
    </Flex>
  );
}

// The color search: hex, hsl(), rgb() or rgba() in, the tokens of that color (in either theme) out.
type TokenMap = Record<string, string | number>;

interface ColorMatch {
  readonly tokenName: string;
  readonly lightValue: string;
  readonly darkValue: string;
}

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgb(hex: string) {
  const cleanHex = hex.replace("#", "");
  return {
    r: parseInt(cleanHex.slice(0, 2), 16) / 255,
    g: parseInt(cleanHex.slice(2, 4), 16) / 255,
    b: parseInt(cleanHex.slice(4, 6), 16) / 255,
  };
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b].map((channel) => Math.round(channel).toString(16).padStart(2, "0")).join("")}`;

// rgb()/rgba() and hsl()/hsla(), in either syntax: comma- or space-separated, decimal or percent
// channels, a hue in deg, grad, rad or turn, and an alpha after a comma or a slash (ignored: tokens
// are matched by color).
const HUE_UNITS: Record<string, number> = { "": 1, deg: 1, grad: 0.9, rad: 180 / Math.PI, turn: 360 };

function normalizeFunctionalColor(color: string) {
  const match = /^(rgba?|hsla?)\((.*)\)$/i.exec(color);
  if (!match) return null;
  const args = match[2].trim().split(/\s*,\s*|\s*\/\s*|\s+/);
  if (args.length < 3 || args.length > 4) return null;
  const clamp = (value: number, max: number) => Math.min(max, Math.max(0, value));
  if (match[1].toLowerCase().startsWith("rgb")) {
    const channels = args.slice(0, 3).map((arg) => clamp(parseFloat(arg) * (arg.endsWith("%") ? 2.55 : 1), 255));
    return channels.some(Number.isNaN) ? null : rgbToHex(channels[0], channels[1], channels[2]);
  }
  const [hueArg, saturation, lightness] = args.map((arg) => parseFloat(arg));
  const factor = HUE_UNITS[/[a-z]*$/i.exec(args[0])?.[0].toLowerCase() ?? ""];
  if (factor === undefined || [hueArg, saturation, lightness].some(Number.isNaN)) return null;
  const hue = (((hueArg * factor) % 360) + 360) % 360;
  return hslToHex(hue, clamp(saturation, 100), clamp(lightness, 100));
}

// #rgb, #rgba, #rrggbb and #rrggbbaa (alpha ignored).
function normalizeHexColor(color: string) {
  const hex = /^#([\da-f]{3,4}|[\da-f]{6}|[\da-f]{8})$/i.exec(color)?.[1];
  if (!hex) return null;
  const rgb = hex.length <= 4 ? [...hex.slice(0, 3)].map((char) => char + char).join("") : hex.slice(0, 6);
  return `#${rgb.toLowerCase()}`;
}

function normalizeColor(color: string) {
  const value = color.trim();
  return normalizeHexColor(value) ?? normalizeFunctionalColor(value);
}

// Equal within `tolerance` of each of hue, saturation and lightness.
function colorsAreEqual(color1: string, color2: string, tolerance = 0) {
  const normalized1 = normalizeColor(color1);
  const normalized2 = normalizeColor(color2);
  if (normalized1 === null || normalized2 === null) return false;
  if (tolerance === 0) return normalized1 === normalized2;
  const hsl1 = hexToHsl(normalized1);
  const hsl2 = hexToHsl(normalized2);
  return (
    Math.abs(hsl1.h - hsl2.h) <= tolerance &&
    Math.abs(hsl1.s - hsl2.s) <= tolerance &&
    Math.abs(hsl1.l - hsl2.l) <= tolerance
  );
}

// A dark token given as a reference to another ({color.base.blue.800}): that token's value.
function resolveTokenReference(raw: string, tokenMap: TokenMap) {
  if (!raw.startsWith("{") || !raw.endsWith("}")) return null;
  const value = tokenMap[raw.slice(1, -1).replace(/\./g, "-")];
  return value === undefined ? null : String(value);
}

function findColorTokenMatches(searchValue: string, tokens: { light: TokenMap; dark: TokenMap }) {
  const normalizedSearch = normalizeColor(searchValue);
  if (normalizedSearch === null) return [];
  const matches: ColorMatch[] = [];
  Object.keys(tokens.light).forEach((tokenName) => {
    if (!tokenName.startsWith("color-")) return;
    const lightValue = tokens.light[tokenName];
    if (typeof lightValue !== "string") return;
    const rawDark = tokens.dark[tokenName];
    const darkValue =
      rawDark === undefined ? lightValue : (resolveTokenReference(String(rawDark), tokens.light) ?? String(rawDark));
    if (colorsAreEqual(normalizedSearch, lightValue, 2) || colorsAreEqual(normalizedSearch, darkValue, 2)) {
      matches.push({ tokenName, lightValue, darkValue });
    }
  });
  return matches.sort((a, b) => a.tokenName.localeCompare(b.tokenName));
}

const checkerboardStyle: CSSProperties = {
  backgroundImage: [
    "linear-gradient(45deg, #ccc 25%, transparent 25%)",
    "linear-gradient(-45deg, #ccc 25%, transparent 25%)",
    "linear-gradient(45deg, transparent 75%, #ccc 75%)",
    "linear-gradient(-45deg, transparent 75%, #ccc 75%)",
  ].join(", "),
  backgroundSize: "8px 8px",
  backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
  backgroundColor: "white",
};

// Over a checkerboard, so a translucent color shows as one.
const Swatch = ({ value, label }: { value: string; label?: string }) => (
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
    <div
      aria-hidden="true"
      style={{
        width: 32,
        height: 32,
        borderRadius: "var(--radius-small)",
        border: "var(--border-base) solid var(--color-border)",
        ...checkerboardStyle,
      }}
    >
      <div style={{ width: "100%", height: "100%", background: value, borderRadius: "var(--radius-small)" }} />
    </div>
    {label && (
      <Typography size="smaller" textColor="textSecondary" element="span">
        {label}
      </Typography>
    )}
  </div>
);

const ColorMatchItem = ({ tokenName, lightValue, darkValue }: ColorMatch) => {
  const handleCopy = () =>
    copyToClipboard(`var(--${tokenName})`, `Copied --${tokenName} to clipboard`, `Unable to copy --${tokenName}`);
  const hasDarkVariant = lightValue !== darkValue;
  return (
    <Cluster align="center" gap="smaller">
      <Swatch value={lightValue} label={hasDarkVariant ? "Light" : undefined} />
      {hasDarkVariant && <Swatch value={darkValue} label="Dark" />}
      <code
        style={{
          background: "var(--color-surface--background)",
          borderRadius: "var(--radius-base)",
          fontFamily: "monospace",
          fontSize: "var(--typography--fontSize-small)",
          padding: "var(--space-smallest) var(--space-small)",
        }}
      >
        --{tokenName}
      </code>
      <Button size="small" variation="subtle" type="tertiary" icon="copy" onClick={handleCopy} ariaLabel="Copy" />
    </Cluster>
  );
};

export const ColorSearch = () => {
  const [searchValue, setSearchValue] = useState("");
  const colorMatches = useMemo(() => {
    if (!searchValue.trim()) return [];
    return findColorTokenMatches(searchValue, { light: allColors, dark: darkTokens });
  }, [searchValue]);
  return (
    <Stack gap="base">
      <Text>
        Search by hex code, HSL or RGB(A) value across both light and dark mode tokens (e.g. #032B3A, hsl(86, 100%,
        46%), rgba(255,255,255,1)). Results show how each token appears in each theme.
      </Text>
      <InputText
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search"
        aria-label="Enter color value to search"
      />
      {searchValue.trim() && colorMatches.length > 0 && (
        <Stack gap="small">
          {colorMatches.map((match) => (
            <ColorMatchItem {...match} key={match.tokenName} />
          ))}
        </Stack>
      )}
      {searchValue.trim() && colorMatches.length === 0 && (
        <Text variation="subdued">No matching color tokens found.</Text>
      )}
    </Stack>
  );
};
