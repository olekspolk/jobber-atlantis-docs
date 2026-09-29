import markdown from "../../generated/docs/Banner.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Banner",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-banner--basic",
  source: "Banner/Banner.tsx",
  example: `<Banner type={"success"}>Account Details Updated</Banner>`,
} satisfies ComponentSource;
