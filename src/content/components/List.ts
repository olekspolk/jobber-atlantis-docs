import markdown from "../../generated/docs/List.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "List",
  category: "Lists & Tables",
  markdown,
  storybook: "components-lists-and-tables-list--basic",
  source: "List/List.tsx",
  example: `<Card>
  <List
    items={[
      {
        id: 1,
        icon: "wallet",
        iconColor: "orange",
        content: "Payment for Invoice #39",
        value: "-$300.00",
        caption: "Sep 25, 2019",
        onClick: () => {
          alert("Item 1");
        },
      },
      {
        id: 3,
        icon: "paidInvoice",
        content: "Invoice #39",
        value: "$300.00",
        caption: "Sep 24, 2019",
        onClick: () => {
          alert("Item 2");
        },
      },
    ]}
  />
</Card>`,
} satisfies ComponentSource;
