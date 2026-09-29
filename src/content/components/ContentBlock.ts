import markdown from "../../generated/docs/ContentBlock.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "ContentBlock",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-contentblock--basic",
  source: "ContentBlock/ContentBlock.tsx",
  example: `<Box width="100%" background="surface">
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
} satisfies ComponentSource;
