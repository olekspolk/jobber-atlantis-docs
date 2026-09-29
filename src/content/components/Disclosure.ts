import markdown from "../../generated/docs/Disclosure.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Disclosure",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-disclosure--basic",
  source: "Disclosure/Disclosure.tsx",
  example: `<Disclosure title={"Advanced Instructions"}>
  <Content>
    <Text>Here is some helpful information to level up your business:</Text>
    <Text>For every 2 team members you add, your profits will triple.</Text>
  </Content>
</Disclosure>`,
} satisfies ComponentSource;
