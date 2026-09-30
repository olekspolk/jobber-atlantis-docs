import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Emphasis",
  description: "",
  content: () => import("./Emphasis.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `<Typography size="largest" element="span" fontWeight={"extraBold"}>
  Save <Emphasis variation="highlight">40%</Emphasis> today
</Typography>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-text-and-typography-emphasis--basic", "web"),
    },
  ],
} satisfies ComponentContent;
