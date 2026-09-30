import React from "react";
import { Chip } from "@jobber/components/Chip";
import { Box } from "@jobber/components/Box";
import { Icon } from "@jobber/components/Icon";
import { Text } from "@jobber/components/Text";
import { StatusLabel } from "@jobber/components/StatusLabel";

export function ChipPrefixConfigExample() {
  return (
    <Box direction="column" gap="base">
      <Box direction="row" alignItems="center" gap="base">
        <Chip label="Select team">
          <Chip.Prefix>
            <Icon name="person" size="small" />
          </Chip.Prefix>
        </Chip>
        <Text>Default styling</Text>
      </Box>
      <Box direction="row" alignItems="center" gap="large">
        <Chip label="Select team">
          <Chip.Prefix>
            <div style={{ display: "flex", marginRight: 20 }}>
              <Icon name="person" size="small" />
            </div>
          </Chip.Prefix>
        </Chip>
        <Text>Custom wrapper around Icon to add larger margin</Text>
      </Box>
      <Box direction="row" alignItems="center" gap="base">
        <Chip label="Select team">
          <Chip.Prefix>
            <div style={{ display: "flex", marginRight: 15 }}>
              <StatusLabel status="success" label="Ready" />
            </div>
          </Chip.Prefix>
        </Chip>
        <Text>Custom wrapper around child</Text>
      </Box>
    </Box>
  );
}
