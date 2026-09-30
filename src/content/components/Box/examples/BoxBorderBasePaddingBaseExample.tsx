import React from "react";
import { Box } from "@jobber/components/Box";

export function BoxBorderBasePaddingBaseExample() {
  return (
    <Box border="base" padding="base">
      By default you get no padding or borders, but with two &apos;base&apos;
      props you can have both.
    </Box>
  );
}
