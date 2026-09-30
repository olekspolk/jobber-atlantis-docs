import React from "react";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { Card } from "@jobber/components/Card";
import { Heading } from "@jobber/components/Heading";
import { Text } from "@jobber/components/Text";
import { Stack } from "@jobber/components/Stack";
import { Box } from "@jobber/components/Box";

export function ResponsiveSwitcherBasicExample() {
  return (
    <Stack>
      <ResponsiveSwitcher gap="base" limit={2} threshold="60ch">
        <Card>
          <Box padding="base">
            <Stack>
              <Heading level={3}>Left/Top Content</Heading>
              <Text>
                This content will switch between horizontal and vertical layout
                based on the threshold.
              </Text>
            </Stack>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Stack>
              <Heading level={3}>Right/Bottom Content</Heading>
              <Text>
                The layout switches when the container width is less than the
                threshold.
              </Text>
            </Stack>
          </Box>
        </Card>
      </ResponsiveSwitcher>
    </Stack>
  );
}
