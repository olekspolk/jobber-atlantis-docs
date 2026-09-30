import React, { useState } from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";

export const InputTextBasicExample = ({
  onChange,
  ...props
}: Partial<InputTextProps>) => {
  const [value, setValue] = useState(props.value ?? "");

  return (
    <InputText
      name="age"
      placeholder="Age in words"
      {...props}
      value={value}
      onChange={newValue => {
        setValue(newValue);
        onChange?.(newValue);
      }}
    />
  );
};
