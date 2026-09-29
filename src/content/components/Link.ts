import markdown from "../../generated/docs/Link.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Link",
  category: "Text & Typography",
  markdown,
  storybook: "components-text-and-typography-link--basic",
  source: "Link/Link.tsx",
  example: `<Link url="https://en.wikipedia.org/wiki/Hyperlink" external={true}>
  What is a link anyway?
</Link>`,
} satisfies ComponentSource;
