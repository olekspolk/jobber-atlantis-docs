import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "EmptyState",
  content: () => import("./EmptyState.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  mobileProps,
  component: {
    mobileElement: `<EmptyState
  icon={"home"}
  title={"Title"}
  description={"Description"}
  primaryAction={{
    label: "Click Me",
    onPress: () => {
      alert("Hi!");
    },
  }}
  secondaryAction={{
    label: "Don't Forget About Me",
    onPress: () => {
      alert("Hi!");
    },
  }}
/>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-emptystate--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
