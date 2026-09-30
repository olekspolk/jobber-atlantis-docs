import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Flex } from "@jobber/components/Flex";
import { Icon } from "@jobber/components/Icon";

export function ChipSingleSelectExample() {
  return (
    <Flex
      template={["shrink", "shrink", "shrink", "shrink"]}
      direction="row"
      gap="small"
    >
      <Chip label="Option 1" variation="subtle" />
      <Chip label="Option 2">
        <Chip.Suffix>
          <Icon name="checkmark" size="small" color="interactiveSubtle" />
        </Chip.Suffix>
      </Chip>
      <Chip label="Option 3" variation="subtle" />
      <Chip label="Option 4" variation="subtle" />
    </Flex>
  );
}
