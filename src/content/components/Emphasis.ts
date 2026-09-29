import markdown from "../../generated/docs/Emphasis.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Emphasis",
  category: "Text & Typography",
  markdown,
  storybook: "components-text-and-typography-emphasis--basic",
  source: "Emphasis/Emphasis.tsx",
  example: `<Typography size="largest" element="span" fontWeight={"extraBold"}>
  Save <Emphasis variation="highlight">40%</Emphasis> today
</Typography>`,
} satisfies ComponentSource;
