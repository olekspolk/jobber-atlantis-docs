import React from "react";
import { SideKick } from "@jobber/components/SideKick";
import { Card } from "@jobber/components/Card";
import { Box } from "@jobber/components/Box";
import { Text } from "@jobber/components/Text";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function SideKickBasicExample() {
  return (
    <ContentBlock maxWidth="100%">
      <SideKick sideWidth="80px" contentMinWidth="60%">
        <Card>
          <Box padding="base">
            <Text>Main content goes here</Text>
          </Box>
        </Card>
        <Card>
          <Box padding="base">
            <Text>Side panel content goes here</Text>
          </Box>
        </Card>
      </SideKick>
    </ContentBlock>
  );
}
