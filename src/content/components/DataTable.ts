import markdown from "../../generated/docs/DataTable.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "DataTable",
  category: "Lists & Tables",
  markdown,
  storybook: "components-lists-and-tables-datatable-composable--basic",
  source: "DataTable/DataTable.tsx",
  example: `<DataTable
  data={[
    {
      name: "Eddard",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "No",
    },
    {
      name: "Catelyn",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "No",
    },
    {
      name: "Jon Snow",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "Yes",
    },
    {
      name: "Robert",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "No",
    },
    {
      name: "Rickon",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "No",
    },
    {
      name: "Robert",
      house: "Baratheon",
      region: "Stormlands",
      sigil: "Black Stag",
      isAlive: "No",
    },
    {
      name: "Cercei",
      house: "Lannister",
      region: "Westerlands",
      sigil: "Golden Lion",
      isAlive: "Yes",
    },
    {
      name: "Sansa",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "Yes",
    },
    {
      name: "Arya",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "Yes",
    },
    {
      name: "Bran",
      house: "Stark",
      region: "North",
      sigil: "Direwolf",
      isAlive: "Yes",
    },
    {
      name: "Joffrey",
      house: "Baratheon",
      region: "Stormlands",
      sigil: "Black Stag",
      isAlive: "No",
    },
    {
      name: "Myrcella",
      house: "Baratheon",
      region: "Stormlands",
      sigil: "Black Stag",
      isAlive: "Yes",
    },
    {
      name: "Tommen",
      house: "Baratheon",
      region: "Stormlands",
      sigil: "Black Stag",
      isAlive: "Yes",
    },
  ]}
  columns={[
    { accessorKey: "name" },
    { accessorKey: "house" },
    { accessorKey: "region" },
    { accessorKey: "sigil" },
    { accessorKey: "isAlive" },
  ]}
/>`,
} satisfies ComponentSource;
