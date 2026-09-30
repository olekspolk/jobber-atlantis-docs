import React, { useState } from "react";
import { Select } from "@jobber/components/Select";

export function SelectGroupedExample() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <Select label="Produce" value={value} onValueChange={setValue}>
      <Select.Group>
        <Select.GroupLabel>Fruits</Select.GroupLabel>
        <Select.Item value="apple">Apple</Select.Item>
        <Select.Item value="banana">Banana</Select.Item>
      </Select.Group>
      <Select.Group>
        <Select.GroupLabel>Vegetables</Select.GroupLabel>
        <Select.Item value="carrot">Carrot</Select.Item>
        <Select.Item value="spinach">Spinach</Select.Item>
      </Select.Group>
    </Select>
  );
}
