import markdown from "../../generated/docs/Switch.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Switch",
  category: "Selections",
  markdown,
  storybook: "components-selections-switch--basic",
  source: "Switch/Switch.tsx",
  example: `<Switch />`,
} satisfies ComponentSource;
