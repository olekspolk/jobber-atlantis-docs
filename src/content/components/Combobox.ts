import markdown from "../../generated/docs/Combobox.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Combobox",
  markdown,
  storybook: "components-selections-combobox--single-select",
  source: "Combobox/Combobox.tsx",
  example: `const teamMembers = [
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
        {teamMember => (
          <Combobox.Item key={teamMember} value={teamMember}>
            {teamMember}
          </Combobox.Item>
        )}
      </Combobox.List>
    </Combobox.Content>
  </Combobox>
);`,
} satisfies ComponentSource;
