import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Avatar",
  description: "An Avatar is used to display a visual identifier for an individual user.",
  content: () => import("./Avatar.mdx"),
  notes: () => import("./Avatar.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `<Avatar initials={"JBLR"} name={"The Jobbler"} size={"large"} />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-images-and-icons-avatar--basic", "web"),
    },
  ],
} satisfies ComponentContent;
