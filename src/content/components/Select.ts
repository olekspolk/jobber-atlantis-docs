import markdown from "../../generated/docs/Select.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Select",
  markdown,
  storybook: "components-selections-select--basic",
  source: "Select/Select.tsx",
  example: `const [value, setValue] = useState("active");

const labels = {
  all: "All statuses",
  active: "Active",
  draft: "Draft",
  archived: "Archived",
  cancelled: "Cancelled",
};

return (
  <Select
    label={"Status"}
    value={value}
    onValueChange={setValue}
    renderValue={value => labels[value]}
  >
    <Select.Item value="all">All statuses</Select.Item>
    <Select.Separator />
    <Select.Group>
      <Select.GroupLabel>Open</Select.GroupLabel>
      <Select.Item value="active">Active</Select.Item>
      <Select.Item value="draft">Draft</Select.Item>
    </Select.Group>
    <Select.Group>
      <Select.GroupLabel>Closed</Select.GroupLabel>
      <Select.Item value="archived">Archived</Select.Item>
      <Select.Item value="cancelled">Cancelled</Select.Item>
    </Select.Group>
  </Select>
);`,
} satisfies ComponentSource;
