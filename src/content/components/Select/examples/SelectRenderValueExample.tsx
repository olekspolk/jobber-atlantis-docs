import React, { useState } from "react";
import { Select } from "@jobber/components/Select";

const PRIORITY_LABELS: Record<string, string> = {
  low: "Low priority",
  medium: "Medium priority",
  high: "High priority",
};

export function SelectRenderValueExample() {
  const [value, setValue] = useState<string | undefined>("high");

  return (
    <Select
      label="Priority"
      value={value}
      onValueChange={setValue}
      renderValue={selected => PRIORITY_LABELS[selected]}
    >
      <Select.Item value="low">Low</Select.Item>
      <Select.Item value="medium">Medium</Select.Item>
      <Select.Item value="high">High</Select.Item>
    </Select>
  );
}
