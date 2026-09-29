import markdown from "../../generated/docs/ProgressBar.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "ProgressBar",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-progressbar--basic",
  source: "ProgressBar/ProgressBar.tsx",
  example: `<ProgressBar totalSteps={100} currentStep={66} />`,
} satisfies ComponentSource;
