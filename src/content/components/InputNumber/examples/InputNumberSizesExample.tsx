import React, { useState } from "react";
import { InputNumber } from "@jobber/components";
import { Content } from "@jobber/components/Content";

export function InputNumberSizesExample() {
  const [small, setSmall] = useState<number | null>(42);
  const [base, setBase] = useState<number | null>(42);
  const [large, setLarge] = useState<number | null>(42);

  return (
    <Content>
      <InputNumber
        label="Small"
        size="small"
        suffix={{ label: "items" }}
        value={small}
        onValueCommitted={setSmall}
      />
      <InputNumber
        label="Default"
        size="default"
        suffix={{ label: "items" }}
        value={base}
        onValueCommitted={setBase}
      />
      <InputNumber
        label="Large"
        size="large"
        suffix={{ label: "items" }}
        value={large}
        onValueCommitted={setLarge}
      />
    </Content>
  );
}
