import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Select",
  content: () => import("./Select.mdx"),
  notes: () => import("./Select.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behaviour", label: "Behaviour" },
    { id: "component-view-variants", label: "Variants" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-do's-and-don'ts", label: "Do's and Don'ts" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  mobileProps,
  component: {
    element: `const [value, setValue] = useState("active");

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
    renderValue={(value) => labels[value]}
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
    mobileElement: `<View style={{ width: "100%" }}>
  <Select.Root>
    <Select.Label>City</Select.Label>
    <Select.Trigger>
      <Select.Value placeholder="Select a city" />
    </Select.Trigger>
    <Select.Content>
      <Select.Group>
        <Select.GroupLabel>West</Select.GroupLabel>
        <Select.Item value="van" label="Vancouver" />
        <Select.Item value="cgy" label="Calgary" />
        <Select.Item value="edm" label="Edmonton" />
      </Select.Group>
      <Select.Separator />
      <Select.Group>
        <Select.GroupLabel>East</Select.GroupLabel>
        <Select.Item value="tor" label="Toronto" />
        <Select.Item value="mtl" label="Montreal" />
        <Select.Item value="hal" label="Halifax" />
      </Select.Group>
    </Select.Content>
  </Select.Root>
</View>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-select--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-selections-select-selectcomposable--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
