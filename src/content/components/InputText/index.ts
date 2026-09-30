import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputText",
  content: () => import("./InputText.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-states", label: "States" },
  ],
  props,
  mobileProps,
  component: {
    element: `const [value, setValue] = useState("");

return (
  <InputText placeholder={"Type here"} value={value} onChange={setValue} />
);`,
    mobileElement: `<InputText name="age" placeholder="Age in words." />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputtext--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputtext--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/InputText?isLegacy=true" },
  ],
} satisfies ComponentContent;
