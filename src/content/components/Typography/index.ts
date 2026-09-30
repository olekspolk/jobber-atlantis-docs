import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Typography",
  content: () => import("./Typography.mdx"),
  notes: () => import("./Typography.notes.mdx"),
  toc: [
    { id: "component-view-font-size", label: "Font size" },
    { id: "component-view-font-weight", label: "Font weight" },
    { id: "component-view-alignment", label: "Alignment" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Typography size="large">Typography</Typography>`,
    mobileElement: `<Typography size="large">Typography</Typography>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-text-and-typography-typography--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-text-and-typography-typography--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
