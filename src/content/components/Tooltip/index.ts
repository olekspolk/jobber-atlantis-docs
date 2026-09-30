import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Tooltip",
  content: () => import("./Tooltip.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `<Flex gap="large" template={["shrink", "shrink"]}>
  <Tooltip message={"'tis a button"}>
    <Button label="Hover on Me" />
  </Tooltip>
  <Tooltip message={"'tis a button"}>
    <Button label="Hover on Me Too" />
  </Tooltip>
</Flex>`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-overlays-tooltip--basic", "web"),
    },
  ],
} satisfies ComponentContent;
