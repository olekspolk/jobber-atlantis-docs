import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "InputPhoneNumber",
  content: () => import("./InputPhoneNumber.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-clearable", label: "Clearable" },
  ],
  props,
  component: {
    element: `const [value, setValue] = useState("");
return (
  <InputPhoneNumber
    placeholder={"Enter your phone number"}
    value={value}
    onChange={setValue}
  />
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputphonenumber--basic", "web"),
    },
    {
      label: "Legacy V1 Docs",
      url: "https://v6.atlantis.pages.dev/components/InputPhoneNumber?isLegacy=true",
    },
  ],
} satisfies ComponentContent;
