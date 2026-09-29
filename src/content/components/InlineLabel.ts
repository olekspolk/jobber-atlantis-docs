import markdown from "../../generated/docs/InlineLabel.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InlineLabel",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-inlinelabel--basic",
  source: "InlineLabel/InlineLabel.tsx",
  example: `<InlineLabel>Default</InlineLabel>`,
} satisfies ComponentSource;
