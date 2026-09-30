import React from "react";
import { InlineLabel } from "@jobber/components/InlineLabel";

export function InlineLabelSizesExample() {
  return (
    <>
      <InlineLabel size="base" color="blue">
        Base
      </InlineLabel>
      <InlineLabel size="small" color="blue">
        Small
      </InlineLabel>
      <InlineLabel size="large" color="blue">
        Beta
      </InlineLabel>
      <InlineLabel size="larger" color="green">
        99+
      </InlineLabel>
    </>
  );
}
