import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Frame",
  content: () => import("./Frame.mdx"),
  props,
  component: {
    element: `<Frame aspectX={16} aspectY={9}>
  <img src="/img_collage.jpg" />
</Frame>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-frame--basic", "web"),
    },
  ],
} satisfies ComponentContent;
