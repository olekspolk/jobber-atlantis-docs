import markdown from "../../generated/docs/Icon.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Icon",
  category: "Images & Icons",
  markdown,
  storybook: "components-images-and-icons-icon--basic",
  source: "Icon/Icon.tsx",
  example: `<Icon name="happyFace" />`,
} satisfies ComponentSource;
