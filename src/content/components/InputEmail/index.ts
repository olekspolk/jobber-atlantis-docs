import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputEmail",
  content: () => import("./InputEmail.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-clearable", label: "Clearable" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  mobileProps,
  component: {
    element: `const [value, setValue] = useState("");
return (
  <InputEmail
    placeholder={"Enter your email"}
    value={value}
    onChange={setValue}
  />
);`,
    mobileElement: `<InputEmail placeholder={"Enter your email"} />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputemail--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputemail--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/InputEmail?isLegacy=true" },
  ],
} satisfies ComponentContent;
