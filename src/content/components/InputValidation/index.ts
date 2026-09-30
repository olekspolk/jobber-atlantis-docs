import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "InputValidation",
  content: () => import("./InputValidation.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `const [name, setName] = useState("");
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
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputvalidation--basic", "web"),
    },
  ],
} satisfies ComponentContent;
