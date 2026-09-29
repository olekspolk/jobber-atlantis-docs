import markdown from "../../generated/docs/Box.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Box",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-box--basic",
  source: "Box/Box.tsx",
  example: `<Box padding="large" background="success--surface" radius="large" border="base">
  <Text>Box content</Text>
</Box>`,
} satisfies ComponentSource;
