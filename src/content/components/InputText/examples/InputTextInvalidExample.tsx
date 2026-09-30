import React from "react";
import { InputText } from "@jobber/components/InputText";
import type { InputTextProps } from "@jobber/components/InputText";

export function InputTextInvalidExample(
  props: Partial<Omit<InputTextProps, "multiline" | "rows">>,
) {
  return (
    <InputText placeholder="Email" value="atlantis" invalid={true} {...props} />
  );
}
