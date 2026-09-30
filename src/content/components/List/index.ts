import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "List",
  content: () => import("./List.mdx"),
  notes: () => import("./List.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage Guidelines" }],
  props,
  component: {
    element: `<Card>
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
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-lists-and-tables-list--basic", "web"),
    },
  ],
} satisfies ComponentContent;
