import type { ComponentProps } from "react";
import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Avatar } from "@jobber/components/Avatar";
import { Icon } from "@jobber/components/Icon";

export function ChipWithAvatarExample(
  props: Partial<ComponentProps<typeof Chip>>,
) {
  return (
    <Chip label="Gavin Messina" {...props}>
      <Chip.Prefix>
        <Avatar
          size="small"
          src="https://images.unsplash.com/photo-1669475535925-a011d7c31d45?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </Chip.Prefix>
      <Chip.Suffix>
        <Icon name="cross" size="small" />
      </Chip.Suffix>
    </Chip>
  );
}
