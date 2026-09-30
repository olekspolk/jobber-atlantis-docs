import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "DatePicker",
  content: () => import("./DatePicker.mdx"),
  notes: () => import("./DatePicker.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `const [date, setDate] = useState(new Date());

const changeDate = (dateIn) => {
  setDate(dateIn);
  showToast({
    message: "Date changed to: " + date.toLocaleString(),
    variation: "success",
  });
};

return <DatePicker selected={date} onChange={changeDate} />;`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-datepicker--basic", "web"),
    },
  ],
} satisfies ComponentContent;
