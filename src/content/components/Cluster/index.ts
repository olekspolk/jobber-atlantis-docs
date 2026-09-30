import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Cluster",
  content: () => import("./Cluster.mdx"),
  props,
  component: {
    element: `<Cluster>
  <Chip label="Cluster Chip" />
  <Heading level={5}>These are all in a cluster</Heading>
  <Button label="Clustered items have variable widths" />
  <Text>They wrap when they run out of space</Text>
</Cluster>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-cluster--basic", "web"),
    },
  ],
} satisfies ComponentContent;
