import markdown from "../../generated/docs/Chip.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Chip",
  category: "Selections",
  markdown,
  storybook: "components-selections-chip--base",
  source: "Chip/Chip.tsx",
  example: `<Chip label="Chip!" />`,
} satisfies ComponentSource;
