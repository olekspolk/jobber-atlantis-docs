import React, { useState } from "react";
import { InputNumber } from "@jobber/components";

export function InputNumberCompositionConditionalStepperExample() {
  const [unitCost, setUnitCost] = useState<number | null>(0);
  const [markup, setMarkup] = useState<number | null>(20);

  return (
    <>
      <InputNumber
        label="Unit cost"
        onValueCommitted={setUnitCost}
        prefix={{ label: "$" }}
        value={unitCost}
      />
      <InputNumber.Wrapper onValueCommitted={setMarkup} value={markup}>
        <InputNumber.Label>Markup</InputNumber.Label>
        <InputNumber.Affix label="%" variation="suffix" />
        {Boolean(unitCost) && <InputNumber.Stepper />}
      </InputNumber.Wrapper>
    </>
  );
}
