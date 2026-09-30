import React from "react";
import { ResponsiveSwitcher } from "@jobber/components/ResponsiveSwitcher";
import { Card } from "@jobber/components/Card";
import { Text } from "@jobber/components/Text";
import { Box } from "@jobber/components/Box";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function ResponsiveSwitcherWithItemLimitExample() {
  return (
    <ContentBlock maxWidth="100%">
      <ResponsiveSwitcher threshold="30ch" limit={3}>
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
        <Card>
          <Box padding="base">
            <Text>Fourth item (will force all to wrap)</Text>
          </Box>
        </Card>
      </ResponsiveSwitcher>
    </ContentBlock>
  );
}
