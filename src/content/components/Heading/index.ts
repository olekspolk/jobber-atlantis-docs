import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Heading",
  description: "",
  content: () => import("./Heading.mdx"),
  notes: () => import("./Heading.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-platform-considerations", label: "Platform considerations" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Heading level={1} element={"h1"}>
  New client
</Heading>`,
    mobileElement: `<Heading level={1} element={"h1"}>
  New client
</Heading>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-text-and-typography-heading--levels", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-text-and-typography-heading--levels", "mobile"),
    },
  ],
} satisfies ComponentContent;
