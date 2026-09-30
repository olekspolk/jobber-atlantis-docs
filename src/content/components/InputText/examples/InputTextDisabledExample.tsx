import React from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";

export function InputTextDisabledExample(
  props: Partial<Omit<InputTextProps, "multiline" | "rows">>,
) {
  return (
    <InputText
      placeholder="Credit card"
      value="**** **** **** 1234"
      disabled={true}
      {...props}
    />
  );
}
