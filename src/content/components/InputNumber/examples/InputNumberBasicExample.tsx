import React, { useState } from "react";
import type { InputNumberProps } from "@jobber/components";
import { InputNumber } from "@jobber/components";

export function InputNumberBasicExample(props: Partial<InputNumberProps>) {
  const [value, setValue] = useState<number | null>(3);

  return (
    <InputNumber
      label="Quantity"
      min={0}
      max={100}
      {...props}
      value={value}
      onValueCommitted={setValue}
    />
  );
}
