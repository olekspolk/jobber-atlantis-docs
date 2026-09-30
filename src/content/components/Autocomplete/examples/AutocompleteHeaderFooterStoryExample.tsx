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
  { label: "Roof Inspection" },
  { label: "Flooring Installation" },
  { label: "Baseboard Installation" },
  { label: "HVAC Repair" },
  { label: "HVAC Installation" },
];

export function AutocompleteHeaderFooterStoryExample() {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");
  const [lastAction, setLastAction] = useState("");

  return (
    <Content>
      <Heading level={4}>Persistent header/footer actions</Heading>
      <Autocomplete
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onBlur={() => action("console.log")("blurred")}
        onFocus={() => action("console.log")("focused")}
        onInputChange={setInputValue}
        menu={defineMenu<OptionLike>([
          {
            type: "header",
            label: "Pinned header",
            shouldClose: false,
            onClick: () => setLastAction("Header clicked"),
          },
          { type: "options", options: simpleOptions },
          {
            type: "footer",
            label: "Pinned footer",
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
