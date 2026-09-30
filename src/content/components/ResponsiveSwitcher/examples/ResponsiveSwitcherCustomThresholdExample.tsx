import React from "react";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function ResponsiveSwitcherCustomThresholdExample() {
  return (
    <ContentBlock maxWidth="100%">
      <ResponsiveSwitcher threshold="200px">
        <Box>
          <Card>
            <Box padding="base">
              <Text>Custom breakpoint</Text>
            </Box>
          </Card>
        </Box>
        <Box>
          <Card>
            <Box padding="base">
              <Text>at 200px</Text>
            </Box>
          </Card>
        </Box>
      </ResponsiveSwitcher>
    </ContentBlock>
  );
}
