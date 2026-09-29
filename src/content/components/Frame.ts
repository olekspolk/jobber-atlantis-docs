import markdown from "../../generated/docs/Frame.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Frame",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-frame--basic",
  source: "Frame/Frame.tsx",
  example: `<Frame aspectX={16} aspectY={9}>
  <img src="https://picsum.photos/id/1018/800/450" />
</Frame>`,
} satisfies ComponentSource;
