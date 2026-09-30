import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Divider",
  content: () => import("./Divider.mdx"),
  notes: () => import("./Divider.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  mobileProps,
  component: {
    element: `<div
  style={{
    display: "grid",
    gap: "var(--space-base)",
  }}
>
  <Content>Some amazing content</Content>
  <Divider direction={"horizontal"} />
  <Content>Even more amazing content</Content>
</div>`,
    mobileElement: `<>
  <Content>Some amazing content</Content>
  <Divider size={"base"} direction={"horizontal"} />
  <Content>Even more amazing content</Content>
</>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-divider--horizontal", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-divider--horizontal", "mobile"),
    },
  ],
} satisfies ComponentContent;
