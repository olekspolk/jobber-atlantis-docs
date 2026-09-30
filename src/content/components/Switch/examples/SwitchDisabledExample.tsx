import React from "react";
import { Switch } from "@jobber/components/Switch";

export function SwitchDisabledExample() {
  return (
    <Switch value={false} ariaLabel="Visible to clients" disabled={true} />
  );
}
