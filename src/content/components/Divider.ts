import markdown from "../../generated/docs/Divider.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Divider",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-divider--horizontal",
  source: "Divider/Divider.tsx",
  example: `<div
  style={{
    display: "grid",
    gap: "var(--space-base)",
  }}
>
  <Content>Some amazing content</Content>
  <Divider direction={"horizontal"} />
  <Content>Even more amazing content</Content>
</div>`,
} satisfies ComponentSource;
