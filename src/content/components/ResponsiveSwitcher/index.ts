import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "ResponsiveSwitcher",
  content: () => import("./ResponsiveSwitcher.mdx"),
  props,
  component: {
    element: `<ContentBlock maxWidth="100%">
  <ResponsiveSwitcher threshold="50ch">
    <Card>
      <Box padding="base">
        <Text>Content Left/Above</Text>
      </Box>
    </Card>
    <Card>
      <Box padding="base">
        <Text>Content Right/Below</Text>
      </Box>
    </Card>
  </ResponsiveSwitcher>
</ContentBlock>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-responsiveswitcher--basic", "web"),
    },
  ],
} satisfies ComponentContent;
