import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "AutoLink",
  content: () => import("./AutoLink.mdx"),
  notes: () => import("./AutoLink.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  mobileProps,
  component: {
    mobileElement: `<AutoLink>This is a block of text with a 555-555-5555 link in it</AutoLink>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-text-and-typography-autolink--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
