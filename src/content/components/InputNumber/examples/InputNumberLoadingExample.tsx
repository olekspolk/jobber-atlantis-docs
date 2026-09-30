import React, { useState } from "react";
import { InputNumber } from "@jobber/components";

export function InputNumberLoadingExample() {
  const [value, setValue] = useState<number | null>(42);

  return (
    <InputNumber
      loading
      label="Quantity"
      suffix={{ label: "items" }}
      value={value}
      onValueCommitted={setValue}
    />
  );
}
