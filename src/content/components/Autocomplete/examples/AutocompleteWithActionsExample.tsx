import React, { useState } from "react";
import { action } from "storybook/actions";
import {
  Autocomplete,
  type OptionLike,
  defineMenu,
} from "@jobber/components/Autocomplete";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Emphasis } from "@jobber/components/Emphasis";

const simpleOptions: OptionLike[] = [
  { label: "Drain Cleaning" },
  { label: "Pipe Replacement" },
  { label: "Sewer Line Repair" },
  { label: "Seasonal Refreshment" },
  { label: "Window Cleaning" },
];

const simpleOptionsSecondSection: OptionLike[] = [
  { label: "Grout Cleaning" },
  { label: "Tile Cleaning" },
  { label: "Lock Repair" },
  { label: "Window Repair" },
  { label: "Door Repair" },
];

const simpleOptionsThirdSection: OptionLike[] = [
  { label: "Yard Work" },
  { label: "Lawn Care" },
  { label: "Tree Removal" },
  { label: "Snow Removal" },
  { label: "Gutter Cleaning" },
];

export function AutocompleteWithActionsExample() {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [lastAction, setLastAction] = useState("");

  return (
    <Content>
      <Heading level={4}>Section with Actions</Heading>
      <Autocomplete
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onBlur={() => action("console.log")("blurred")}
        onInputChange={setInputValue}
        menu={defineMenu<OptionLike>([
          {
            type: "section",
            label: "Services",
            options: simpleOptions,
            actions: [
              {
                type: "action",
                label: "Add Service",
                onClick: () => setLastAction("Add Service clicked"),
              },
            ],
          },
          {
            type: "section",
            label: "Outdoor",
            options: simpleOptionsSecondSection,
            actions: [
              {
                type: "action",
                label: "Add Outdoor Service",
                onClick: () => setLastAction("Add Outdoor Service clicked"),
              },
            ],
          },
          {
            type: "section",
            label: "Extras",
            options: simpleOptionsThirdSection,
            actions: [
              {
                type: "action",
                label: "Add Extras Service",
                onClick: () => setLastAction("Add Extras Service clicked"),
              },
            ],
          },
        ])}
      />
      {lastAction && (
        <Text>
          <Emphasis variation="bold">Last action:</Emphasis> {lastAction}
        </Text>
      )}
    </Content>
  );
}
