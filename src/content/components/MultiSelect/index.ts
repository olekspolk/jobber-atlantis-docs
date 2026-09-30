import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "MultiSelect",
  content: () => import("./MultiSelect.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `const [options, setOptions] = useState([
  { label: "Synced", checked: true },
  { label: "Errors", checked: false },
  { label: "Warnings", checked: true },
  { label: "Ignored", checked: true },
]);

return (
  <MultiSelect
    defaultLabel={"Status"}
    allSelectedLabel={"All statuses"}
    options={options}
    onOptionsChange={setOptions}
  />
);`,
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-multiselect--basic", "web"),
    },
  ],
} satisfies ComponentContent;
