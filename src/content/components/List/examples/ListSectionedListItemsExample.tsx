import React from "react";
import type { ComponentProps } from "react";
import { action } from "storybook/actions";
import { List } from "@jobber/components/List";
import { Card } from "@jobber/components/Card";
import type { ListItemProps } from "@jobber/components/List";

const sectionedListItems: ListItemProps[] = [
  {
    id: 1,
    icon: "addNote",
    title: "Darryl Tec added a note",
    content: [
      "_'Called the client. Asked if they want the luxury package, they said yes!'_",
      "Deck Build",
    ],
    caption: "1 minute ago",
    section: "Today",
    isActive: true,
    onClick: () => {
      action("alert")("TODO: Implement onClick");
    },
  },
  {
    id: 2,
    icon: "checkmark",
    iconColor: "success",
    title: "Josh Elford completed a visit",
    content: "Annual Maintenance",
    caption: "2 hours ago",
    section: "Today",
    onClick: () => {
      action("alert")("TODO: Implement onClick");
    },
  },
  {
    id: 3,
    icon: "badInvoice",
    title: "Payment failed",
    content: "For services rendered",
    value: "$300.00",
    caption: "1 day ago",
    section: "Yesterday",
    onClick: () => {
      action("alert")("TODO: Implement onClick");
    },
  },
];

export function ListSectionedListItemsExample(
  props: Partial<ComponentProps<typeof List>>,
) {
  return (
    <Card>
      <List items={sectionedListItems} {...props} />
    </Card>
  );
}
