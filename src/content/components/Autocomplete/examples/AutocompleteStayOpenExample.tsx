import React, { useState } from "react";
import {
  Autocomplete,
  type OptionLike,
  defineMenu,
} from "@jobber/components/Autocomplete";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";

export const AutocompleteStayOpenExample = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");

  return (
    <Content>
      <Heading level={5}>Stay Open Action</Heading>
      <Autocomplete
        placeholder="Search"
        value={value}
        onChange={setValue}
        inputValue={inputValue}
        onInputChange={setInputValue}
        menu={defineMenu<OptionLike>([
          {
            type: "options",
            options: [
              { label: "Drain Cleaning" },
              { label: "Pipe Replacement" },
              { label: "Sewer Line Repair" },
            ],
            actions: [
              {
                type: "action",
                label: "Add Service (stays open)",
                shouldClose: false,
                onClick: () => alert("Add Service"),
              },
            ],
          },
        ])}
      />
    </Content>
  );
};
