import React from "react";
import { Box } from "@jobber/components/Box";
import { Text } from "@jobber/components/Text";
import { InlineLabel } from "@jobber/components/InlineLabel";

export function InlineLabelCountsExample() {
  return (
    <Box direction="row" alignItems="baseline" gap="small">
      <Text>Unread</Text>
      <InlineLabel color="red">+99</InlineLabel>
    </Box>
  );
}
