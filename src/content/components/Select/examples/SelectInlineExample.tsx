import React, { useState } from "react";
import { Select } from "@jobber/components/Select";

export function SelectInlineExample() {
  const [value, setValue] = useState<string | undefined>("active");

  return (
    <div>
      Set the record to{" "}
      <Select label="Status" inline value={value} onValueChange={setValue}>
        <Select.Item value="active">Active</Select.Item>
        <Select.Item value="archived">Archived</Select.Item>
        <Select.Item value="draft">Draft</Select.Item>
      </Select>{" "}
      today.
    </div>
  );
}
