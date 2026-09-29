import markdown from "../../generated/docs/Cover.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Cover",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-cover--basic",
  source: "Cover/Cover.tsx",
  example: `<Cover minHeight="100vh">
  <Text>Content Above</Text>
  <Cover.Center>
    <Text>Centered Content</Text>
  </Cover.Center>
  <Text>Content Below</Text>
</Cover>`,
} satisfies ComponentSource;
