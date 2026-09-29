import markdown from "../../generated/docs/Menu.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Menu",
  markdown,
  storybook: "components-navigation-menu-composable--action-menu",
  source: "Menu/Menu.tsx",
  example: `<Menu>
      <Menu.Trigger>
        More Actions
      </Menu.Trigger>
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
} satisfies ComponentSource;
