import React from "react";
import { Box } from "@jobber/components/Box";

export function BoxGapExample() {
  return (
    <Box direction="row" alignItems="center" gap="large">
      <Box padding="base" width={50} border="base">
        Left, 50px wide
      </Box>
      <Box padding="base" height={25} border="base">
        Right, 25px high
      </Box>
    </Box>
  );
}
