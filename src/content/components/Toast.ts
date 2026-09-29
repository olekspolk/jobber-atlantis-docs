import markdown from "../../generated/docs/Toast.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Toast",
  category: "Status & Feedback",
  markdown,
  storybook: "components-status-and-feedback-toast--basic",
  source: "Toast/Toast.tsx",
  example: `<Button
  label="Show toast"
  onClick={() => showToast({ message: "Showed toast" })}
/>`,
} satisfies ComponentSource;
