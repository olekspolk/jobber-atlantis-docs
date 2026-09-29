import markdown from "../../generated/docs/ResponsiveSwitcher.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "ResponsiveSwitcher",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-responsiveswitcher--basic",
  source: "ResponsiveSwitcher/ResponsiveSwitcher.tsx",
  example: `<ContentBlock maxWidth="100%">
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
} satisfies ComponentSource;
