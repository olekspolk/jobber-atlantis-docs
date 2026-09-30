import React, { useState } from "react";
import { InputNumber } from "@jobber/components";
import { Content } from "@jobber/components/Content";

export function InputNumberAffixesExample() {
  const [price, setPrice] = useState<number | null>(42);
  const [days, setDays] = useState<number | null>(7);
  const [reps, setReps] = useState<number | null>(3);

  return (
    <Content>
      <InputNumber
        label="Price"
        prefix={{ label: "$" }}
        suffix={{ label: "USD" }}
        value={price}
        onValueCommitted={setPrice}
      />

      <InputNumber
        label="Follow-up in"
        suffix={{ icon: "calendar", label: "days" }}
        value={days}
        onValueCommitted={setDays}
      />

      <InputNumber
        label="Repetitions"
        suffix={{
          icon: "cross",
          ariaLabel: "Clear value",
          onClick: () => setReps(null),
        }}
        value={reps}
        onValueCommitted={setReps}
      />
    </Content>
  );
}
