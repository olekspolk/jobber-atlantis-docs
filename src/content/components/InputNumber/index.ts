import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputNumber",
  content: () => import("./InputNumber.mdx"),
  notes: () => import("./InputNumber.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behavior", label: "Behavior" },
    { id: "component-view-options", label: "Options" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-do's-and-don'ts", label: "Do's and Don'ts" },
    { id: "component-view-accessibility-notes", label: "Accessibility notes" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  mobileProps,
  component: {
    element: `const [value, setValue] = useState(3);
return (
  <InputNumber
    label="Quantity"
    min={0}
    max={100}
    value={value}
    onValueCommitted={setValue}
  />
);`,
    mobileElement: `<InputNumber placeholder={"Quantity"} />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputnumber--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputnumber--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/InputNumber?isLegacy=true" },
  ],
} satisfies ComponentContent;
