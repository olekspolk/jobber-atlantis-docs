import React from "react";
import { SideKick } from "@jobber/components/SideKick";
import { Card } from "@jobber/components/Card";
import { Box } from "@jobber/components/Box";
import { Text } from "@jobber/components/Text";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function SideKickCustomWidthsExample() {
  return (
    <ContentBlock maxWidth="100%">
      <SideKick contentMinWidth="50%" sideWidth="40%">
        <Card>
          <Box padding="base">
            <Text>Main content (50% width or wrap)</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text> Side width (40% of remaining space)</Text>
          </Box>
        </Card>
      </SideKick>
    </ContentBlock>
  );
}
