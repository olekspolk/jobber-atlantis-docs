import markdown from "../../generated/docs/InputNumber.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputNumber",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputnumber--basic",
  source: "InputNumber/InputNumber.tsx",
  example: `const [value, setValue] = useState(3);
return (
  <InputNumber
    label="Quantity"
    min={0}
    max={100}
    value={value}
    onValueCommitted={setValue}
  />
);`,
} satisfies ComponentSource;
