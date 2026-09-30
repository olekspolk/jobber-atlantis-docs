import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "StatusIndicator",
  content: () => import("./StatusIndicator.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-status-indicators", label: "Status Indicators" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `<Box direction="row" gap="base">
  <StatusIndicator status={"success"} />
  <StatusIndicator status={"warning"} />
  <StatusIndicator status={"critical"} />
  <StatusIndicator status={"inactive"} />
  <StatusIndicator status={"informative"} />
</Box>`,
    defaultProps: { status: "success" },
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-statusindicator--basic", "web"),
    },
  ],
} satisfies ComponentContent;
