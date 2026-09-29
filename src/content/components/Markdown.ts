import markdown from "../../generated/docs/Markdown.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Markdown",
  category: "Text & Typography",
  markdown,
  storybook: "components-text-and-typography-markdown--basic",
  source: "Markdown/Markdown.tsx",
  example: `const content = \`### Bananas
Bananas are **yellow** on the outside and **white** on the inside. They're also full of nutrients, _but thats just boring stuff_. At this point, I'll just ask you to [google it](https://lmgtfy.com/?q=types+of+bananas).\`;

return (
  <Markdown content={content} basicUsage={undefined} externalLink={true} />
);`,
} satisfies ComponentSource;
