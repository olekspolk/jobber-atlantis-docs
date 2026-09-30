import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Chip",
  content: () => import("./Chip.mdx"),
  notes: () => import("./Chip.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Chip label="Chip!" />`,
    mobileElement: `<Chip
  label={"Active chip"}
  onPress={() => {
    alert("hi!");
  }}
  accessibilityLabel={"Active chip"}
  isActive={true}
/>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-chip--base", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-selections-chip--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
