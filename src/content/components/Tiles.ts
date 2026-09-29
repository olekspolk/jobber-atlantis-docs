import markdown from "../../generated/docs/Tiles.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Tiles",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-tiles--basic",
  source: "Tiles/Tiles.tsx",
  example: `<Tiles>
  <Frame>
    <img src="https://picsum.photos/id/1018/800/450" />
  </Frame>
  <Frame>
    <img src="https://picsum.photos/id/1018/800/450" />
  </Frame>
</Tiles>`,
} satisfies ComponentSource;
