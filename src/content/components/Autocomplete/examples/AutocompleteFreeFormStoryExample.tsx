import React, { useState } from "react";
import {
  Autocomplete,
  type OptionLike,
  defineMenu,
} from "@jobber/components/Autocomplete";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";

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

export function AutocompleteFreeFormStoryExample() {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={4}>Free-form create</Heading>
      <Autocomplete
        placeholder="Type anything"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        allowFreeForm
        createFreeFormValue={label => ({ label })}
        menu={defineMenu<OptionLike>([
          { type: "options", options: simpleOptions },
        ])}
      />
      <Text>Try typing an option not in the list, and blurring the input</Text>
      <Heading level={5}>Selected value: {value?.label}</Heading>
    </Content>
  );
}
