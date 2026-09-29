import markdown from "../../generated/docs/LegacySelect.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "LegacySelect",
  category: "Selections",
  markdown,
  storybook: "components-selections-legacyselect--basic",
  source: "LegacySelect/LegacySelect.tsx",
  example: `<LegacySelect placeholder={"Select an option"}>
  <Option value="one">One</Option>
  <Option value="two">Two</Option>
  <Option value="three">Three</Option>
</LegacySelect>`,
} satisfies ComponentSource;
