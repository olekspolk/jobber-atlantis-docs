import React, { useState } from "react";
import { InputNumber } from "@jobber/components";

export function InputNumberCompositionCustomLayoutExample() {
  const [value, setValue] = useState<number | null>(3);

  return (
    <InputNumber.Wrapper inline onValueCommitted={setValue} value={value}>
      <InputNumber.Group>
        <InputNumber.Decrement ariaLabel="Decrease quantity" />
        <InputNumber.Input>
          <InputNumber.Label>Quantity</InputNumber.Label>
        </InputNumber.Input>
        <InputNumber.Increment ariaLabel="Increase quantity" />
      </InputNumber.Group>
    </InputNumber.Wrapper>
  );
}
