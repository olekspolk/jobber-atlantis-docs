import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "ProgressIndicator",
  content: () => import("./ProgressIndicator.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-relationship-to-progressbar", label: "Relationship to ProgressBar" },
    { id: "component-view-mobile", label: "Mobile" },
  ],
  props,
  mobileProps,
  component: {
    element: `<ProgressIndicator value={66} />`,
    mobileElement: `<View style={{ width: "100%" }}>
  <ProgressIndicator value={2} pendingValue={3} max={10} />
</View>`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-progressindicator--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-progressindicator--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
