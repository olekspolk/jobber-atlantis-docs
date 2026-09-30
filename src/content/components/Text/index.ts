import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Text",
  content: () => import("./Text.mdx"),
  notes: () => import("./Text.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-alignment", label: "Alignment" },
    { id: "component-view-maxlines", label: "maxLines" },
    { id: "component-view-platform-considerations-(web)", label: "Platform Considerations (Web)" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Text>Text</Text>`,
    mobileElement: `<Text>Text</Text>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-text-and-typography-text--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-text-and-typography-text--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
