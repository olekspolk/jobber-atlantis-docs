import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputDate",
  content: () => import("./InputDate.mdx"),
  notes: () => import("./InputDate.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  mobileProps,
  component: {
    element: `const [date, setDate] = useState(new Date());
return <InputDate value={date} onChange={setDate} />;`,
    mobileElement: `const [date, setDate] = useState(new Date("11/11/2011"));

return <InputDate value={date} onChange={setDate} />;`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputdate--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputdate--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/InputDate?isLegacy=true" },
  ],
} satisfies ComponentContent;
