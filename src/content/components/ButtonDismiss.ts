import markdown from "../../generated/docs/ButtonDismiss.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "ButtonDismiss",
  category: "Private",
  markdown,
  storybook: "components-private-buttondismiss--basic",
  source: "ButtonDismiss/ButtonDismiss.tsx",
  example: `<ButtonDismiss
  ariaLabel="Dismiss"
  onClick={function onClick() {
    alert("Dismissed!");
  }}
/>`,
} satisfies ComponentSource;
