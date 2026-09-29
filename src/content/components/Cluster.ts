import markdown from "../../generated/docs/Cluster.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Cluster",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-cluster--basic",
  source: "Cluster/Cluster.tsx",
  example: `<Cluster>
  <Chip label="Cluster Chip" />
  <Heading level={5}>These are all in a cluster</Heading>
  <Button label="Clustered items have variable widths" />
  <Text>They wrap when they run out of space</Text>
</Cluster>`,
} satisfies ComponentSource;
