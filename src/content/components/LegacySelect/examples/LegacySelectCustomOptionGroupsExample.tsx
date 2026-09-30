import React, { useState } from "react";
import { LegacySelect } from "@jobber/components/LegacySelect";

export function LegacySelectCustomOptionGroupsExample() {
  const [value, setValue] = useState<string | number | undefined>("");

  return (
    <LegacySelect
      placeholder="Select an option"
      UNSAFE_experimentalStyles={true}
      value={value}
      onChange={setValue}
    >
      <LegacySelect.OptionGroup label="Team A">
        <LegacySelect.Option value="alice">Alice</LegacySelect.Option>
        <LegacySelect.Option value="bob">Bob</LegacySelect.Option>
        <LegacySelect.Option value="charlie">Charlie</LegacySelect.Option>
      </LegacySelect.OptionGroup>
      <LegacySelect.OptionGroup label="Team B">
        <LegacySelect.Option value="diana">Diana</LegacySelect.Option>
        <LegacySelect.Option value="evan">Evan</LegacySelect.Option>
        <LegacySelect.Option value="frank">Frank</LegacySelect.Option>
      </LegacySelect.OptionGroup>
      <LegacySelect.OptionGroup label="Team C">
        <LegacySelect.Option value="grace">Grace</LegacySelect.Option>
        <LegacySelect.Option value="hector">Hector</LegacySelect.Option>
        <LegacySelect.Option value="isabel">Isabel</LegacySelect.Option>
      </LegacySelect.OptionGroup>
    </LegacySelect>
  );
}
