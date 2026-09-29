import markdown from "../../generated/docs/InputEmail.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputEmail",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputemail--basic",
  source: "InputEmail/InputEmail.tsx",
  example: `const [value, setValue] = useState("");
return (
  <InputEmail
    placeholder={"Enter your email"}
    value={value}
    onChange={setValue}
  />
);`,
} satisfies ComponentSource;
