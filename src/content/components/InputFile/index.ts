import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "InputFile",
  content: () => import("./InputFile.mdx"),
  notes: () => import("./InputFile.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `<InputFile />`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputfile--variations-and-sizes", "web"),
    },
  ],
} satisfies ComponentContent;
