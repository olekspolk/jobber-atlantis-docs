import markdown from "../../generated/docs/InputValidation.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "InputValidation",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-inputvalidation--basic",
  source: "InputValidation/InputValidation.tsx",
  example: `const [name, setName] = useState("");
const [error, setError] = useState("");

return (
  <>
    <Text>
      My name is
      <InputText
        value={name}
        onChange={(newValue) => {
          setName(newValue);
          if (!newValue) {
            setError("Please tell me your name");
          } else if (!/Jeff/.test(newValue)) {
            setError("Have you considered a better name, like Jeff?");
          } else {
            setError("");
          }
        }}
        size="small"
        inline={true}
        maxLength={4}
        invalid={!!error}
        error={error}
      />
    </Text>
    {error && <InputValidation message={error} />}
  </>
);`,
} satisfies ComponentSource;
