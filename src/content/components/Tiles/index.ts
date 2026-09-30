import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Tiles",
  content: () => import("./Tiles.mdx"),
  props,
  component: {
    element: `<Tiles>
  <Frame>
    <img src="/img_collage.jpg" />
  </Frame>
  <Frame>
    <img src="/img_collage.jpg" />
  </Frame>
</Tiles>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-tiles--basic", "web"),
    },
  ],
} satisfies ComponentContent;
