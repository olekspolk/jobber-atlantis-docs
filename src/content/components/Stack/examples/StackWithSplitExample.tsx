import React from "react";
import { Stack } from "@jobber/components/Stack";
import { Card } from "@jobber/components/Card";
import { Box } from "@jobber/components/Box";
import { Text } from "@jobber/components/Text";

export function StackWithSplitExample() {
  return (
    <div style={{ height: "400px" }}>
      <Stack gap="base" splitAfter={1}>
        <Card>
          <Box padding="base">
            <Text>First item</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Second item</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Third item</Text>
          </Box>
        </Card>
      </Stack>
    </div>
  );
}
