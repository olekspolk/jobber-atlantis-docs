import markdown from "../../generated/docs/Autocomplete.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Autocomplete",
  category: "Forms & Inputs",
  markdown,
  storybook: "components-forms-and-inputs-autocomplete--flat",
  source: "Autocomplete/Autocomplete.tsx",
  example: `const [value, setValue] = useState();
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
} satisfies ComponentSource;
