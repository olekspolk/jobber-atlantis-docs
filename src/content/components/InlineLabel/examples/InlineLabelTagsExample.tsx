import React from "react";
import { Box } from "@jobber/components/Box";
import { InlineLabel } from "@jobber/components/InlineLabel";

export function InlineLabelTagsExample() {
  return (
    <Box direction="row" alignItems="center" gap="smaller">
      <InlineLabel>Preferred customer</InlineLabel>
      <InlineLabel>Northeast</InlineLabel>
      <InlineLabel>Residential</InlineLabel>
      <InlineLabel>Electrical</InlineLabel>
      <InlineLabel>10OFF promo</InlineLabel>
    </Box>
  );
}
