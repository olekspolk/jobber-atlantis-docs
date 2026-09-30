import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Content",
  content: () => import("./Content.mdx"),
  notes: () => import("./Content.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  mobileProps,
  component: {
    element: `return (
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
    mobileElement: `<Content direction={"vertical"}>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam neque
    quam nemo dolores illo eaque qui possimus consequuntur libero.
  </Text>
  <Text>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque totam neque
    quam nemo dolores illo eaque qui possimus consequuntur libero.
  </Text>
</Content>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-content--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-content--vertical", "mobile"),
    },
  ],
} satisfies ComponentContent;
