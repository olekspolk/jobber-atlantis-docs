import markdown from "../../generated/docs/Heading.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Heading",
  category: "Text & Typography",
  markdown,
  storybook: "components-text-and-typography-heading--levels",
  source: "Heading/Heading.tsx",
  example: `<Heading level={1} element={"h1"}>
  New client
</Heading>`,
} satisfies ComponentSource;
