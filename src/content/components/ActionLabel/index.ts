import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "ActionLabel",
  content: () => import("./ActionLabel.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  mobileProps,
  component: {
    mobileElement: `<ActionLabel>{"I am a label text"}</ActionLabel>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-actions-actionlabel--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
