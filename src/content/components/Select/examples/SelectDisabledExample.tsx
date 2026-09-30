import React from "react";
import { Select } from "@jobber/components/Select";

export function SelectDisabledExample() {
  return (
    <Select label="Status" disabled value="active">
      <Select.Item value="active">Active</Select.Item>
      <Select.Item value="archived">Archived</Select.Item>
      <Select.Item value="draft">Draft</Select.Item>
    </Select>
  );
}
