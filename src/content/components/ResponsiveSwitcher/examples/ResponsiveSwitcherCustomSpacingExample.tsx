import React from "react";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { Card } from "@jobber/components/Card";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Stack } from "@jobber/components/Stack";
import { Box } from "@jobber/components/Box";

export function ResponsiveSwitcherCustomSpacingExample() {
  return (
    <Stack>
      <ResponsiveSwitcher gap="12px" limit={2} threshold="40ch">
        <Card>
          <Box padding="base">
            <Stack>
              <Heading level={3}>Custom Space</Heading>
              <Text>Using a custom spacing value</Text>
            </Stack>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Stack>
              <Heading level={3}>Between Items</Heading>
              <Text>The gap between items is customizable</Text>
            </Stack>
          </Box>
        </Card>
      </ResponsiveSwitcher>
    </Stack>
  );
}
