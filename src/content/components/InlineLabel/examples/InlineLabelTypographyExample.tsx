import React from "react";
import { Box } from "@jobber/components/Box";
import { Heading } from "@jobber/components/Heading";
import { InlineLabel } from "@jobber/components/InlineLabel";

export function InlineLabelTypographyExample() {
  return (
    <Box direction="row" alignItems="center" gap="small">
      <Heading level={2}>New feature</Heading>
      <InlineLabel size="large">Beta</InlineLabel>
    </Box>
  );
}
