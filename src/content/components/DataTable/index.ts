import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "DataTable",
  content: () => import("./DataTable.mdx"),
  notes: () => import("./DataTable.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
  ],
  props,
  component: {
    element: `<DataTable
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
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-lists-and-tables-datatable-composable--basic", "web"),
    },
  ],
} satisfies ComponentContent;
