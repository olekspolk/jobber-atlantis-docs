import markdown from "../../generated/docs/StatusIndicator.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "StatusIndicator",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-statusindicator--basic",
  source: "StatusIndicator/StatusIndicator.tsx",
  example: `<Box direction="row" gap="base">
  <StatusIndicator status={"success"} />
  <StatusIndicator status={"warning"} />
  <StatusIndicator status={"critical"} />
  <StatusIndicator status={"inactive"} />
  <StatusIndicator status={"informative"} />
</Box>`,
} satisfies ComponentSource;
