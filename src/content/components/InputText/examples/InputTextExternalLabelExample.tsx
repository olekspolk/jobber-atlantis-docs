import React, { useState } from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";
import { FormFieldLabel } from "@jobber/components/FormField";

export function InputTextExternalLabelExample(
  props: Partial<Omit<InputTextProps, "multiline" | "rows">>,
) {
  const [value, setValue] = useState<string>(props.value ?? "");

  return (
    <div style={{ width: "100%" }}>
      <FormFieldLabel external={true} htmlFor="ext-input">
        External label
      </FormFieldLabel>
      <InputText
        id="ext-input"
        name="name"
        clearable="always"
        showMiniLabel={false}
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
    </div>
  );
}
