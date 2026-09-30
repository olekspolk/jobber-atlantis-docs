import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Glimmer",
  content: () => import("./Glimmer.mdx"),
  toc: [
    { id: "component-view-colors", label: "Colors" },
    { id: "component-view-semantic-blocks", label: "Semantic blocks" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Glimmer />`,
    mobileElement: `<Glimmer shape={"rectangle"} size={"base"} timing={"base"} />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-glimmer--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-glimmer--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
