import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Box",
  content: () => import("./Box.mdx"),
  notes: () => import("./Box.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-what-about-actual-layout-usages?", label: "What about actual layout usages?" },
  ],
  props,
  component: {
    element: `<Box padding="large" background="success--surface" radius="large" border="base">
  <Text>Box content</Text>
</Box>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-box--basic", "web"),
    },
  ],
} satisfies ComponentContent;
