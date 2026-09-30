import React, { useState } from "react";
import { InputNumber } from "@jobber/components";

export function InputNumberCompositionExample() {
  const [value, setValue] = useState<number | null>(3);

  return (
    <InputNumber.Wrapper onValueCommitted={setValue} value={value}>
      <InputNumber.Label>Quantity</InputNumber.Label>
      <InputNumber.Stepper>
        <InputNumber.Increment ariaLabel="Increase Quantity">
          +
        </InputNumber.Increment>
        <InputNumber.Decrement ariaLabel="Decrease Quantity">
          −
        </InputNumber.Decrement>
      </InputNumber.Stepper>
    </InputNumber.Wrapper>
  );
}
