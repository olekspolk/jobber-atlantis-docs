import markdown from "../../generated/docs/Flex.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Flex",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-flex--basic",
  source: "Flex/Flex.tsx",
  example: `<Flex template={["grow", "shrink"]}>
  <Flex align="start" template={["shrink", "grow"]}>
    <Icon name="quote" />
    <Content spacing="small">
      <Flex template={["grow", "shrink"]}>
        <Emphasis variation="bold">Dylan Tec</Emphasis>
        <StatusLabel label="Success" status="success" />
      </Flex>
      <Text>Sep 03 | $100 | Quote #93</Text>
    </Content>
  </Flex>
  <Icon name="arrowRight" />
</Flex>`,
} satisfies ComponentSource;
