import React from "react";
import type { ComponentProps } from "react";
import { Glimmer } from "@jobber/components/Glimmer";
import { Box } from "@jobber/components/Box";

export function GlimmerReverseThemeExample(
  props: Partial<ComponentProps<typeof Glimmer>>,
) {
  return (
    <Box background="surface--reverse" padding="base">
      <Glimmer reverseTheme {...props} />
    </Box>
  );
}
