import React, { useState } from "react";
import { LegacySelect } from "@jobber/components/LegacySelect";

export function LegacySelectCustomOptionGroupDisabledExample() {
  const [value, setValue] = useState<string | number | undefined>("");

  return (
    <LegacySelect
      UNSAFE_experimentalStyles
      placeholder="Select an option"
      value={value}
      onChange={setValue}
    >
      <LegacySelect.OptionGroup label="Available Items">
        <LegacySelect.Option value="option1">Option 1</LegacySelect.Option>
        <LegacySelect.Option value="option2">Option 2</LegacySelect.Option>
      </LegacySelect.OptionGroup>
      <LegacySelect.OptionGroup label="Unavailable Items" disabled>
        <LegacySelect.Option value="option3">Option 3</LegacySelect.Option>
        <LegacySelect.Option value="option4">Option 4</LegacySelect.Option>
      </LegacySelect.OptionGroup>
      <LegacySelect.OptionGroup label="More Items">
        <LegacySelect.Option value="option5">Option 5</LegacySelect.Option>
        <LegacySelect.Option value="option6">Option 6</LegacySelect.Option>
      </LegacySelect.OptionGroup>
    </LegacySelect>
  );
}
