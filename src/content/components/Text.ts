import markdown from "../../generated/docs/Text.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Text",
  category: "Text & Typography",
  markdown,
  storybook: "components-text-and-typography-text--basic",
  source: "Text/Text.tsx",
  example: `<Text>Text</Text>`,
} satisfies ComponentSource;
