import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Menu",
  content: () => import("./Menu.mdx"),
  notes: () => import("./Menu.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behavior", label: "Behavior" },
    { id: "component-view-variants", label: "Variants" },
    { id: "component-view-content-guidelines", label: "Content Guidelines" },
    { id: "component-view-do's-and-don'ts", label: "Do's and Don'ts" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `<Menu>
  <Menu.Trigger>More Actions</Menu.Trigger>
  <Menu.Content>
    <Menu.Item
      onClick={function onClick() {
        alert("✏️");
      }}
      textValue="Edit"
    >
      <Menu.ItemLabel>Edit</Menu.ItemLabel>
    </Menu.Item>
    <Menu.Item
      onClick={function onClick() {
        alert("📱");
      }}
      textValue="Text message"
    >
      <Menu.ItemLabel>Text message</Menu.ItemLabel>
    </Menu.Item>
    <Menu.Item
      onClick={function onClick() {
        alert("📨");
      }}
      textValue="Email"
    >
      <Menu.ItemLabel>Email</Menu.ItemLabel>
    </Menu.Item>
  </Menu.Content>
</Menu>`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-navigation-menu-composable--action-menu", "web"),
    },
  ],
} satisfies ComponentContent;
