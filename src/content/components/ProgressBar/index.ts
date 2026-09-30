import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "ProgressBar",
  content: () => import("./ProgressBar.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  mobileProps,
  component: {
    element: `<ProgressBar totalSteps={100} currentStep={66} />`,
    mobileElement: `<View style={{ width: "100%" }}>
  <ProgressBar total={5} current={1} inProgress={2} />
</View>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-progressbar--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-progressbar--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
