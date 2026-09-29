import markdown from "../../generated/docs/MultiSelect.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "MultiSelect",
  category: "Deprecated",
  markdown,
  storybook: "components-selections-multiselect--basic",
  source: "MultiSelect/MultiSelect.tsx",
  example: `const [options, setOptions] = useState([
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
} satisfies ComponentSource;
