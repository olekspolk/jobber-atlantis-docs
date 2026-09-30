import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "FilterPicker",
  content: () => import("./FilterPicker.mdx"),
  notes: () => import("./FilterPicker.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `const [selected, setSelected] = useState([
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
    <FilterPicker
      label="Teammates"
      selected={selected}
      onSelect={setSelected}
    >
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
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-filterpicker--clear-selection", "web"),
    },
  ],
} satisfies ComponentContent;
