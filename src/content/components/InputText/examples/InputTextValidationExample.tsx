import React, { useState } from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";

export function InputTextValidationExample(
  props: Partial<Omit<InputTextProps, "multiline" | "rows">>,
) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>();

  function handleChange(newValue: string) {
    setValue(newValue);

    if (!newValue) {
      setError("You have to tell us your age");
    } else if (!isNaN(Number(newValue))) {
      setError("Type your age in words please.");
    } else if (newValue.length >= 10) {
      setError("That seems too old.");
    } else {
      setError(undefined);
    }
  }

  return (
    <InputText
      placeholder="What's your age"
      value={value}
      onChange={handleChange}
      invalid={!!error}
      error={error}
      {...props}
    />
  );
}
