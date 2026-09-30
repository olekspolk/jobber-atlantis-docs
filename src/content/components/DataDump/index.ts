import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "DataDump",
  content: () => import("./DataDump.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `<DataDump data={{ name: "Bob" }}></DataDump>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-utilities-datadump--basic", "web"),
    },
  ],
} satisfies ComponentContent;
