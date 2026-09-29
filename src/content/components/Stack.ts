import markdown from "../../generated/docs/Stack.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Stack",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-stack--basic",
  source: "Stack/Stack.tsx",
  example: `<Stack>
  <Card>
    <Box padding="base">Vertically</Box>
  </Card>
  <Card>
    <Box padding="base">Stacked</Box>
  </Card>
</Stack>`,
} satisfies ComponentSource;
