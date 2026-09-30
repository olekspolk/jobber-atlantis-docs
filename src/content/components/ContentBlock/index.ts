import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "ContentBlock",
  content: () => import("./ContentBlock.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-examples", label: "Examples" },
  ],
  props,
  component: {
    element: `<Box width="100%" background="surface">
  <ContentBlock justify="center">
    <Card>
      <Box padding="base">
        <Text>
          I am a card inside of a content block. Instead of being 100% width, I
          have been constrained and horizontally justified by the content block.
        </Text>
      </Box>
    </Card>
  </ContentBlock>
</Box>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-contentblock--basic", "web"),
    },
  ],
} satisfies ComponentContent;
