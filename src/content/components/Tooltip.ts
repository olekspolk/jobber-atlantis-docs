import markdown from "../../generated/docs/Tooltip.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Tooltip",
  category: "Overlays",
  markdown,
  storybook: "components-overlays-tooltip--basic",
  source: "Tooltip/Tooltip.tsx",
  example: `<Flex gap="large" template={["shrink", "shrink"]}>
  <Tooltip message={"'tis a button"}>
    <Button label="Hover on Me" />
  </Tooltip>
  <Tooltip message={"'tis a button"}>
    <Button label="Hover on Me Too" />
  </Tooltip>
</Flex>`,
} satisfies ComponentSource;
