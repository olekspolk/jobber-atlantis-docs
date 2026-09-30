import React, { useState } from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";

export function InputTextKeyboardExample(
  props: Partial<Omit<InputTextProps, "multiline" | "rows">>,
) {
  const [value, setValue] = useState<string>(props.value ?? "");

  return (
    <InputText
      placeholder="Describe your age"
      inputMode="numeric"
      {...props}
      value={value}
      onChange={(
        newValue: string,
        event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        setValue(newValue);
        props.onChange?.(newValue, event);
      }}
    />
  );
}
