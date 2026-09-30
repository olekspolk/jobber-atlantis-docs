import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "DataList",
  content: () => import("./DataList.mdx"),
  notes: () => import("./DataList.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `const data = [
  { id: 1, name: "Test Person", email: "sample@example.com" },
  { id: 2, name: "Second Person", email: "second@example.com" },
  { id: 3, name: "Third Person", email: "third@example.com" },
];

const headers = {
  name: "Name",
  email: "Email",
};

return (
  <DataList data={data} headers={headers}>
    <DataList.Layout>
      {(item) => (
        <Grid>
          <Grid.Cell size={{ xs: 6 }}>{item.name}</Grid.Cell>
          <Grid.Cell size={{ xs: 6 }}>{item.email}</Grid.Cell>
        </Grid>
      )}
    </DataList.Layout>
    <DataList.EmptyState
      message="No items to display"
      action={<Button label="Add item" onClick={() => alert("Add item")} />}
    />
  </DataList>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-lists-and-tables-datalist--basic", "web"),
    },
  ],
} satisfies ComponentContent;
