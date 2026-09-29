import markdown from "../../generated/docs/Typography.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Typography",
  category: "Text & Typography",
  markdown,
  storybook: "components-text-and-typography-typography--basic",
  source: "Typography/Typography.tsx",
  example: `<Typography size="large">Typography</Typography>`,
} satisfies ComponentSource;
