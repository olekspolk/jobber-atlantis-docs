import markdown from "../../generated/docs/StatusLabel.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "StatusLabel",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-statuslabel--basic",
  source: "StatusLabel/StatusLabel.tsx",
  example: `<StatusLabel label="StatusLabel!" />`,
} satisfies ComponentSource;
