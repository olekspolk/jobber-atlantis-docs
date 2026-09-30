import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Cover",
  content: () => import("./Cover.mdx"),
  props,
  component: {
    element: `<Cover minHeight="100vh">
  <Text>Content Above</Text>
  <Cover.Center>
    <Text>Centered Content</Text>
  </Cover.Center>
  <Text>Content Below</Text>
</Cover>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-cover--basic", "web"),
    },
  ],
} satisfies ComponentContent;
