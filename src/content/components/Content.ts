import markdown from "../../generated/docs/Content.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Content",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-content--basic",
  source: "Content/Content.tsx",
  example: `return (
  <div style={{ width: "100%" }}>
    <Content spacing={"base"}>
      <Heading level={6} element={"p"}>
        Base
      </Heading>
      <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
      <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
      <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
      <Content spacing={"small"}>
        <Heading level={6} element={"p"}>
          Small
        </Heading>
        <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
        <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
        <Box background={"base-blue--500"} height={16} radius={"base"}></Box>
      </Content>
    </Content>
  </div>
);`,
} satisfies ComponentSource;
