import React, { useState } from "react";
import { Select } from "@jobber/components/Select";

export function SelectErrorExample() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Select
      label="Status"
      description="This controls who can see the record."
      error="Please choose a status."
      value={value}
      onValueChange={setValue}
    >
      <Select.Item value="active">Active</Select.Item>
      <Select.Item value="archived">Archived</Select.Item>
      <Select.Item value="draft">Draft</Select.Item>
    </Select>
  );
}
