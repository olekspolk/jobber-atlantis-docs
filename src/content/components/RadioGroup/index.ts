import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "RadioGroup",
  content: () => import("./RadioGroup.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `const [company, setCompany] = useState("apple");

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
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-radiogroup--basic", "web"),
    },
  ],
} satisfies ComponentContent;
