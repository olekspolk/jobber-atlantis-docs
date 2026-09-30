import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Spinner",
  content: () => import("./Spinner.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `<Spinner />`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-spinner--basic", "web"),
    },
  ],
} satisfies ComponentContent;
