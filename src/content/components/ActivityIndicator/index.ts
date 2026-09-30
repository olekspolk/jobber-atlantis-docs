import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "ActivityIndicator",
  content: () => import("./ActivityIndicator.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-reduced-motion", label: "Reduced motion" },
    { id: "component-view-cross-platform-behavior", label: "Cross-platform behavior" },
    { id: "component-view-relationship-to-spinner", label: "Relationship to Spinner" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  props,
  mobileProps,
  component: {
    element: `<ActivityIndicator />`,
    mobileElement: `<ActivityIndicator size="small" />`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-activityindicator--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-activityindicator--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
