import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "InlineLabel",
  content: () => import("./InlineLabel.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-variants", label: "Variants" },
  ],
  props,
  component: {
    element: `<InlineLabel>Default</InlineLabel>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-inlinelabel--basic", "web"),
    },
  ],
} satisfies ComponentContent;
