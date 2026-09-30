import React, { useState } from "react";
import { Select } from "@jobber/components/Select";

export function SelectEmptyExample() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Select label="Status" value={value} onValueChange={setValue}>
      <Select.Item value="active">Active</Select.Item>
      <Select.Item value="archived">Archived</Select.Item>
      <Select.Item value="draft">Draft</Select.Item>
    </Select>
  );
}
