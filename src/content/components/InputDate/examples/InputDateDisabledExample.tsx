import React from "react";
import { InputDate } from "@jobber/components/InputDate";
import type { InputDateProps } from "@jobber/components/InputDate";

export function InputDateDisabledExample(props: InputDateProps) {
  return <InputDate placeholder="Start Date" disabled={true} {...props} />;
}
