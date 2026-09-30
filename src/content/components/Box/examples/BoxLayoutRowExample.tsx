import React from "react";
import { Box } from "@jobber/components/Box";

export function BoxLayoutRowExample() {
  return (
    <Box direction="row">
      <Box padding="base" width="grow">
        Left
      </Box>
      <Box padding="base" width="grow">
        Right
      </Box>
    </Box>
  );
}
