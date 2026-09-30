import React from "react";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { Stack } from "@jobber/components/Stack";
import { Text } from "@jobber/components/Text";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function ClusterAlignmentOptionsExample() {
  return (
    <Stack gap="larger">
      <Cluster align="start">
        <Button label="Start" />
        <Button label="Align" type="secondary" />
        <ContentBlock maxWidth="50%">
          <Stack>
            <Text>
              Plus some text to make the cluster longer and wider and taller to
              show off how the alignment works
            </Text>
            <Text>
              Plus some text to make the cluster longer and wider and taller to
              show off how the alignment works
            </Text>
          </Stack>
        </ContentBlock>
      </Cluster>
      <Cluster align="center">
        <Button label="Center" />
        <Button label="Align" type="secondary" />
        <ContentBlock maxWidth="50%">
          <Stack>
            <Text>
              Plus some text to make the cluster longer and wider and taller to
              show off how the alignment works
            </Text>
            <Text>
              Plus some text to make the cluster longer and wider and taller to
              show off how the alignment works
            </Text>
          </Stack>
        </ContentBlock>
      </Cluster>
      <Cluster align="end">
        <Button label="End" />
        <Button label="Align" type="secondary" />
        <ContentBlock maxWidth="50%">
          <Stack>
            <Text>
              Plus some text to make the cluster longer and wider and taller to
              show off how the alignment works
            </Text>
            <Text>
              Plus some text to make the cluster longer and wider and taller to
              show off how the alignment works
            </Text>
          </Stack>
        </ContentBlock>
      </Cluster>
    </Stack>
  );
}
