import React from "react";
import { Cluster } from "@jobber/components/Cluster";
import { Chip } from "@jobber/components/Chip";
import { Stack } from "@jobber/components/Stack";

export function ClusterGapVariationsExample() {
  return (
    <Stack>
      <Stack>
        <Cluster gap="small">
          <Chip label="Small" />
          <Chip label="Spacing" />
          <Chip label="Between" />
        </Cluster>
      </Stack>
      <Stack>
        <Cluster gap="base">
          <Chip label="Base" />
          <Chip label="Spacing" />
          <Chip label="Between" />
        </Cluster>
      </Stack>
      <Stack>
        <Cluster gap="large">
          <Chip label="Large" />
          <Chip label="Spacing" />
          <Chip label="Between" />
        </Cluster>
      </Stack>
    </Stack>
  );
}
