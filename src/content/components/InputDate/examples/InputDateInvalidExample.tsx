import React from "react";
import type { InputDateProps } from "@jobber/components/InputDate";
import { InputDate } from "@jobber/components/InputDate";

export function InputDateInvalidExample(props: InputDateProps) {
  return (
    <InputDate
      placeholder="Start date"
      error="Start Date is required"
      invalid={true}
      {...props}
    />
  );
}
