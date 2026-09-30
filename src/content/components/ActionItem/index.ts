import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "ActionItem",
  content: () => import("./ActionItem.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  mobileProps,
  component: {
    mobileElement: `<ActionItem
  icon={"work"}
  onPress={() => {
    alert("Work!");
  }}
>
  <Text>Service Checklist</Text>
</ActionItem>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-actionitem--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
