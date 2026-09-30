import React, { useState } from "react";
import { InputNumber } from "@jobber/components";
import { Content } from "@jobber/components/Content";

export function InputNumberFormattingExample() {
  const [currency, setCurrency] = useState<number | null>(1234.5);
  const [percent, setPercent] = useState<number | null>(0.5);
  const [decimal, setDecimal] = useState<number | null>(11.13);

  return (
    <Content>
      <InputNumber
        label="Currency"
        description='{ style: "currency", currency: "USD" }'
        format={{ style: "currency", currency: "USD" }}
        value={currency}
        onValueCommitted={setCurrency}
      />
      <InputNumber
        label="Percent"
        description='{ style: "percent" } — value is a ratio: 0.5 → 50%'
        format={{ style: "percent", maximumFractionDigits: 2 }}
        value={percent}
        onValueCommitted={setPercent}
      />
      <InputNumber
        label="Decimal"
        description="{ maximumFractionDigits: 2 }"
        format={{ maximumFractionDigits: 2 }}
        value={decimal}
        onValueCommitted={setDecimal}
      />
    </Content>
  );
}
