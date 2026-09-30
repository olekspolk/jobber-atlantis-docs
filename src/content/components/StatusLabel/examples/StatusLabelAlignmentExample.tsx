import React from "react";
import { StatusLabel } from "@jobber/components/StatusLabel";

export function StatusLabelAlignmentExample() {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <StatusLabel label="Start" status="inactive" alignment="start" />
      <StatusLabel label="End" status="inactive" alignment="end" />
    </div>
  );
}
