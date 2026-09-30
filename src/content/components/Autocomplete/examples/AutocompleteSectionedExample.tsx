import React, { useState } from "react";
import { action } from "storybook/actions";
import {
  Autocomplete,
  type OptionLike,
  defineMenu,
} from "@jobber/components/Autocomplete";

export const AutocompleteSectionedExample = () => {
  const [value, setValue] = useState<OptionLike | undefined>();
  const [inputValue, setInputValue] = useState("");
  const menu = defineMenu<OptionLike>([
    {
      type: "section",
      label: "Indoor",
      options: [
        { label: "Drain Cleaning" },
        { label: "Pipe Replacement" },
        { label: "Sewer Line Repair" },
        { label: "Window Cleaning" },
      ],
    },
    {
      type: "section",
      label: "Outdoor",
      options: [
        { label: "Roof Inspection" },
        { label: "Lawn Mowing" },
        { label: "Hedge Trimming" },
      ],
    },
    {
      type: "section",
      label: "Misc",
      options: [
        { label: "Assessment" },
        { label: "Inspection" },
        { label: "2nd Opinion" },
      ],
    },
  ]);

  return (
    <Autocomplete
      placeholder="Search"
      value={value}
      onChange={setValue}
      onBlur={() => action("console.log")("blurred")}
      inputValue={inputValue}
      onInputChange={setInputValue}
      menu={menu}
    />
  );
};
