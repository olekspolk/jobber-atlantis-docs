import markdown from "../../generated/docs/Button.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Button",
  category: "Actions",
  markdown,
  storybook: "components-actions-button--basic",
  source: "Button/Button.tsx",
  example: `<Button label="Button!" onClick={() => alert("Button Clicked!")}></Button>`,
} satisfies ComponentSource;
