import React, { useState } from "react";
import type { InputTextProps } from "@jobber/components/InputText";
import { InputText } from "@jobber/components/InputText";
import { Content } from "@jobber/components/Content";

export function InputTextPrefixSuffixExample(
  props: Partial<Omit<InputTextProps, "multiline" | "rows">>,
) {
  const [invoiceTotal, setInvoiceTotal] = useState<string>(
    props.value ?? "1,000,000",
  );
  const [search, setSearch] = useState<string>(props.value ?? "");

  const handleChange = (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setInvoiceTotal(newValue);
    props.onChange?.(newValue, event);
  };

  const handleSearchChange = (
    newValue: string,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearch(newValue);
    props.onChange?.(newValue, event);
  };

  return (
    <Content>
      <InputText
        placeholder="Invoice Total"
        value={invoiceTotal}
        onChange={handleChange}
        prefix={{ label: "$", icon: "invoice" }}
        suffix={{ label: ".00" }}
        {...props}
      />
      <InputText
        placeholder="Search"
        prefix={{
          icon: "search",
          ariaLabel: "submit search",
          onClick: () => alert("This could submit a search"),
        }}
        value={search}
        onChange={handleSearchChange}
        suffix={{
          icon: "cross",
          ariaLabel: "clear search",
          onClick: () => alert("This could clear a search value"),
        }}
        {...props}
      />
    </Content>
  );
}
