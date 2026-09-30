import React from "react";
import { Box } from "@jobber/components/Box";

export function BoxCustomHeightsWidthsExample() {
  return (
    <Box direction="row" alignItems="center">
      <Box padding="base" width={350} border="base">
        Left, 350px wide
      </Box>
      <Box padding="base" height={75} border="base">
        Right, 75px high
      </Box>
    </Box>
  );
}
