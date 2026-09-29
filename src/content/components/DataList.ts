import markdown from "../../generated/docs/DataList.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "DataList",
  category: "Lists & Tables",
  markdown,
  storybook: "components-lists-and-tables-datalist--basic",
  source: "DataList/DataList.tsx",
  example: `const data = [
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
} satisfies ComponentSource;
