import markdown from "../../generated/docs/RadioGroup.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "RadioGroup",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-radiogroup--basic",
  source: "RadioGroup/RadioGroup.tsx",
  example: `const [company, setCompany] = useState("apple");

return (
  <RadioGroup
    onChange={(value: string) => setCompany(value)}
    value={company}
    ariaLabel="Companies"
  >
    <RadioOption value="apple" label="Apple" />
    <RadioOption value="google" label="Google" />
    <RadioOption value="microsoft" label="Microsoft" />
  </RadioGroup>
);`,
} satisfies ComponentSource;
