import site from "../../site.config.json";
import markdown from "./generated/FilterPicker.md?raw";
import { parseComponentDocs } from "./parseDocs";

// The example the original page loads into the editor (FilterPickerContent.component.element).
export const FILTER_PICKER_EXAMPLE = `const [selected, setSelected] = useState([
    {
      id: "1",
      label: "Bilbo Baggins",
    },
  ]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Button
        label="Clear Selection"
        type="primary"
        onClick={() => setSelected([])}
      />
      <FilterPicker label="Teammates" selected={selected} onSelect={setSelected}>
        <FilterPicker.Option id="1" label="Bilbo Baggins" />
        <FilterPicker.Option id="2" label="Frodo Baggins" />
        <FilterPicker.Option id="3" label="Pippin Took" />
        <FilterPicker.Option id="4" label="Merry Brandybuck" />
        <FilterPicker.Option id="5" label="Sam Gamgee" />
        <FilterPicker.Option id="6" label="Aragorn" />
        <FilterPicker.Option id="7" label="Galadriel" />
        <FilterPicker.Option id="8" label="Arwen" />
        <FilterPicker.Option id="9" label="Gandalf" />
        <FilterPicker.Option id="10" label="Legolas" />
        <FilterPicker.Option id="11" label="Gimli" />
        <FilterPicker.Option id="12" label="Samwise Gamgee" />
        <FilterPicker.Option id="14" label="Faramir" />

        <FilterPicker.Action
          label="Add Teammate"
          onClick={() => {
            alert("Added a new teammate ✅");
          }}
        />
        <FilterPicker.Action
          label="Manage Teammates"
          onClick={() => {
            alert("Managed teammates 👍");
          }}
        />
      </FilterPicker>
    </div>
  );`;

export const FILTER_PICKER_DOCS = parseComponentDocs(markdown);

export const FILTER_PICKER_LINKS = [
  {
    label: "Web Storybook",
    url: `${site.storybookUrl}?path=/story/components-selections-filterpicker--clear-selection`,
  },
  {
    label: "Web GitHub",
    url: `${site.componentsSourceUrl}/FilterPicker/FilterPicker.tsx`,
  },
];
