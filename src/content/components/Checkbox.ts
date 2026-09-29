import markdown from "../../generated/docs/Checkbox.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Checkbox",
  category: "Selections",
  markdown,
  storybook: "components-selections-checkbox--basic",
  source: "Checkbox/Checkbox.tsx",
  example: `const [checked, setChecked] = useState(true);

return (
  <Checkbox
    label={"Save card for future use"}
    checked={checked}
    onChange={setChecked}
  />
);`,
} satisfies ComponentSource;
