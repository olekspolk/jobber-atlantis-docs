import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "ButtonDismiss",
  content: () => import("./ButtonDismiss.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `<ButtonDismiss
  ariaLabel="Dismiss"
  onClick={function onClick() {
    alert("Dismissed!");
  }}
/>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-private-buttondismiss--basic", "web"),
    },
  ],
} satisfies ComponentContent;
