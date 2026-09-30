import React, { useState } from "react";
import { InputNumber } from "@jobber/components";

export function InputNumberCompositionFooterExample() {
  const [value, setValue] = useState<number | null>(50);
  const error = (value ?? 0) > 99 ? "Enter a value between 1 and 99" : "";

  return (
    <InputNumber.Wrapper
      invalid={Boolean(error)}
      max={99}
      min={1}
      onValueChange={setValue}
      value={value}
    >
      <InputNumber.Label>Quantity</InputNumber.Label>
      <InputNumber.Description>Per visit</InputNumber.Description>
      {error && <InputNumber.Error>{error}</InputNumber.Error>}
    </InputNumber.Wrapper>
  );
}
