import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Combobox",
  content: () => import("./Combobox.mdx"),
  notes: () => import("./Combobox.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behavior", label: "Behavior" },
    { id: "component-view-trigger-patterns", label: "Trigger patterns" },
    { id: "component-view-variants", label: "Variants" },
    { id: "component-view-item-content", label: "Item content" },
    { id: "component-view-empty-and-loading-states", label: "Empty and loading states" },
    { id: "component-view-actions", label: "Actions" },
    { id: "component-view-multiple-selection-footer", label: "Multiple-selection footer" },
    { id: "component-view-content-guidelines", label: "Content Guidelines" },
    { id: "component-view-do's-and-don'ts", label: "Do's and Don'ts" },
    { id: "component-view-rich-item-data", label: "Rich item data" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `const teamMembers = [
  "Ryan Clearwater",
  "Bessie Cooper",
  "Cody Fisher",
  "John Smithers",
];

return (
  <Combobox label="Team member" items={teamMembers}>
    <Combobox.TriggerInput placeholder="Search team members" />
    <Combobox.Content>
      <Combobox.List>
        {(teamMember) => (
          <Combobox.Item key={teamMember} value={teamMember}>
            {teamMember}
          </Combobox.Item>
        )}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-combobox--single-select", "web"),
    },
  ],
} satisfies ComponentContent;
