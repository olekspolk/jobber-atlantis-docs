import markdown from "../../generated/docs/Spinner.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Spinner",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-spinner--basic",
  source: "Spinner/Spinner.tsx",
  example: `<Spinner />`,
} satisfies ComponentSource;
