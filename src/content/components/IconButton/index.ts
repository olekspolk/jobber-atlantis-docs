import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "IconButton",
  content: () => import("./IconButton.mdx"),
  toc: [{ id: "component-view-mockup", label: "Mockup" }],
  mobileProps,
  component: {
    mobileElement: `<IconButton
  accessibilityLabel={"New Job"}
  name={"cross"}
  onPress={() => {
    alert("👍");
  }}
/>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-actions-iconbutton--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
