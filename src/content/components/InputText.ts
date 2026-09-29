import markdown from "../../generated/docs/InputText.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputText",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputtext--basic",
  source: "InputText/InputText.tsx",
  example: `const [value, setValue] = useState("");

return (
  <InputText placeholder={"Type here"} value={value} onChange={setValue} />
);`,
} satisfies ComponentSource;
