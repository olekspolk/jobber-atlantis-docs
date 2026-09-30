import type { ComponentProps } from "react";
import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Icon } from "@jobber/components/Icon";

export function ChipInvalidExample(
  props: Partial<ComponentProps<typeof Chip>>,
) {
  return (
    <Chip label="Select team" invalid {...props}>
      <Chip.Prefix>
        <Icon name="alert" size="small" />
      </Chip.Prefix>
    </Chip>
  );
}
