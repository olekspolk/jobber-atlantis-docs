import React, { useState } from "react";
import { InputNumber } from "@jobber/components";

export function InputNumberCompositionStepperlessExample() {
  const [value, setValue] = useState<number | null>(15);

  return (
    <InputNumber.Wrapper
      format={{ style: "unit", unit: "percent" }}
      onValueCommitted={setValue}
      value={value}
    >
      <InputNumber.Label>Tax rate</InputNumber.Label>
    </InputNumber.Wrapper>
  );
}
