import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Flex } from "@jobber/components/Flex";

export function ChipVariationsExample() {
  return (
    <Flex template={["shrink", "shrink"]} direction="row" gap="small">
      <Chip label="Base" />
      <Chip label="Subtle" variation="subtle" />
    </Flex>
  );
}
