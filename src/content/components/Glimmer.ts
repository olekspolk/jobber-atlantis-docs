import markdown from "../../generated/docs/Glimmer.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Glimmer",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-glimmer--basic",
  source: "Glimmer/Glimmer.tsx",
  example: `<Glimmer />`,
} satisfies ComponentSource;
