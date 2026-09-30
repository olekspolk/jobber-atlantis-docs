import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Flex } from "@jobber/components/Flex";
import { Icon } from "@jobber/components/Icon";

export function ChipAddDismissExample() {
  return (
    <Flex
      template={["shrink", "shrink", "shrink", "shrink", "shrink"]}
      direction="row"
      gap="small"
    >
      <Chip label="Add" variation="subtle">
        <Chip.Suffix>
          <Icon name="add" size="small" color="interactiveSubtle" />
        </Chip.Suffix>
      </Chip>
      <Chip label="Option 1">
        <Chip.Suffix>
          <Icon name="cross" size="small" color="interactiveSubtle" />
        </Chip.Suffix>
      </Chip>
      <Chip label="Option 2">
        <Chip.Suffix>
          <Icon name="cross" size="small" color="interactiveSubtle" />
        </Chip.Suffix>
      </Chip>
      <Chip label="Option 3">
        <Chip.Suffix>
          <Icon name="cross" size="small" color="interactiveSubtle" />
        </Chip.Suffix>
      </Chip>
      <Chip label="Option 4">
        <Chip.Suffix>
          <Icon name="cross" size="small" color="interactiveSubtle" />
        </Chip.Suffix>
      </Chip>
    </Flex>
  );
}
