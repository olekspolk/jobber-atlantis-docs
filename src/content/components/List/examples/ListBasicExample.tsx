import React from "react";
import type { ComponentProps } from "react";
import { action } from "storybook/actions";
import { List } from "@jobber/components/List";
import { Card } from "@jobber/components/Card";
import type { ListItemProps } from "@jobber/components/List";

const basicItems: ListItemProps[] = [
  {
    id: 1,
    icon: "wallet",
    iconColor: "orange",
    content: "Payment for Invoice #39",
    value: "-$300.00",
    caption: "Sep 25, 2019",
    onClick: () => {
      action("alert")("TODO: Implement onClick");
    },
  },
  {
    id: 3,
    icon: "paidInvoice",
    content: "Invoice #39",
    value: "$300.00",
    caption: "Sep 24, 2019",
    onClick: () => {
      action("alert")("TODO: Implement onClick");
    },
  },
];

export function ListBasicExample(props: Partial<ComponentProps<typeof List>>) {
  return (
    <Card>
      <List items={basicItems} {...props} />
    </Card>
  );
}
