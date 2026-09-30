import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Markdown",
  content: () => import("./Markdown.mdx"),
  toc: [],
  props,
  component: {
    element: `const content = \`### Bananas
Bananas are **yellow** on the outside and **white** on the inside. They're also full of nutrients, _but thats just boring stuff_. At this point, I'll just ask you to [google it](https://lmgtfy.com/?q=types+of+bananas).\`;

return (
  <Markdown content={content} basicUsage={undefined} externalLink={true} />
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-text-and-typography-markdown--basic", "web"),
    },
  ],
} satisfies ComponentContent;
