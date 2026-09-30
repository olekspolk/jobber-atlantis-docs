import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Icon",
  content: () => import("./Icon.mdx"),
  notes: () => import("./Icon.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-available-icons", label: "Available icons" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Icon name="happyFace" />`,
    mobileElement: `<Icon name="happyFace" />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-images-and-icons-icon--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-images-and-icons-icon--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
