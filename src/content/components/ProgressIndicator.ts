import markdown from "../../generated/docs/ProgressIndicator.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "ProgressIndicator",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-progressindicator--basic",
  source: "ProgressIndicator/ProgressIndicator.tsx",
  example: `<ProgressIndicator value={66} />`,
} satisfies ComponentSource;
