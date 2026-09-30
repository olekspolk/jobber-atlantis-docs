import React, { useState } from "react";
import { LegacySelect, Option } from "@jobber/components/LegacySelect";

export function LegacySelectDisabledExample() {
  const [value, setValue] = useState<string | number | undefined>("");

  return (
    <LegacySelect disabled={true} value={value} onChange={setValue}>
      <Option value="sad">Tony</Option>
      <Option value="old">Steve</Option>
    </LegacySelect>
  );
}
