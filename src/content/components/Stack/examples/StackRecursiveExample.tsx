import React from "react";
import { Stack } from "@jobber/components/Stack";
import { Card } from "@jobber/components/Card";
import { Box } from "@jobber/components/Box";
import { Text } from "@jobber/components/Text";

export function StackRecursiveExample() {
  return (
    <Stack gap="large" recursive>
      <Box>
        <Card>
          <Box padding="base">
            <Text>Nested item 1.1</Text>
            <Text>Nested item 1.1.2</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Nested item 1.2</Text>
          </Box>
        </Card>
      </Box>
      <Box>
        <Card>
          <Box padding="base">
            <Text>Nested item 2.1</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Nested item 2.2</Text>
          </Box>
        </Card>
      </Box>
    </Stack>
  );
}
