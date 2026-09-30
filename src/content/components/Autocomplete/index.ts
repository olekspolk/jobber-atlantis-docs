import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Autocomplete",
  content: () => import("./Autocomplete.mdx"),
  notes: () => import("./Autocomplete.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `const [value, setValue] = useState();
const [inputValue, setInputValue] = useState("");
const menu = [
  {
    type: "section",
    label: "Services",
    options: [
      { label: "Drain Cleaning" },
      { label: "Pipe Replacement" },
      { label: "Sewer Line Repair" },
      { label: "Seasonal Refreshment" },
      { label: "Window Cleaning" },
      { label: "Roof Inspection" },
      { label: "Flooring Installation" },
      { label: "Baseboard Installation" },
      { label: "HVAC Repair" },
      { label: "HVAC Installation" },
    ],
  },
];

return (
  <div style={{ width: "100%" }}>
    <Autocomplete
      placeholder="Search"
      value={value}
      onChange={setValue}
      inputValue={inputValue}
      onInputChange={setInputValue}
      menu={menu}
    />
  </div>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-autocomplete--flat", "web"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/Autocomplete?isLegacy=true" },
  ],
} satisfies ComponentContent;
