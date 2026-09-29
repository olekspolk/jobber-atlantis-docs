import markdown from "../../generated/docs/InputPhoneNumber.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputPhoneNumber",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputphonenumber--basic",
  source: "InputPhoneNumber/InputPhoneNumber.tsx",
  example: `const [value, setValue] = useState("");
return (
  <InputPhoneNumber
    placeholder={"Enter your phone number"}
    value={value}
    onChange={setValue}
  />
);`,
} satisfies ComponentSource;
