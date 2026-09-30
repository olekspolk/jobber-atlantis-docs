import React, { useState } from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";

export function InputTextMultilineExample(
  props: Partial<Omit<InputTextProps, "multiline">>,
) {
  const [value, setValue] = useState<string>(props.value ?? "");

  return (
    <InputText
      multiline={true}
      placeholder="Describe your age"
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
