import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "LegacySelect",
  content: () => import("./LegacySelect.mdx"),
  notes: () => import("./LegacySelect.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-states", label: "States" },
    { id: "component-view-option-grouping", label: "Option Grouping" },
  ],
  props,
  mobileProps,
  component: {
    element: `<LegacySelect placeholder={"Select an option"}>
  <Option value="one">One</Option>
  <Option value="two">Two</Option>
  <Option value="three">Three</Option>
</LegacySelect>`,
    mobileElement: `<Select label={"Favorite number"}>
  <Option value="1">1</Option>
  <Option value="2">2</Option>
</Select>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-legacyselect--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-selections-select--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/Select?isLegacy=true" },
  ],
} satisfies ComponentContent;
