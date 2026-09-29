import markdown from "../../generated/docs/Avatar.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Avatar",
  category: "Images & Icons",
  markdown,
  storybook: "components-images-and-icons-avatar--basic",
  source: "Avatar/Avatar.tsx",
  example: `<Avatar initials={"JBLR"} name={"The Jobbler"} size={"large"} />`,
} satisfies ComponentSource;
