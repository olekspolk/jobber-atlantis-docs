import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Stack",
  content: () => import("./Stack.mdx"),
  props,
  component: {
    element: `<Stack>
  <Card>
    <Box padding="base">Vertically</Box>
  </Card>
  <Card>
    <Box padding="base">Stacked</Box>
  </Card>
</Stack>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-stack--basic", "web"),
    },
  ],
} satisfies ComponentContent;
