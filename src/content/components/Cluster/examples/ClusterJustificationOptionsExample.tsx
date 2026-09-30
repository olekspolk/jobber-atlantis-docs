import React from "react";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";
import { Stack } from "@jobber/components/Stack";
import { ContentBlock } from "@jobber/components/ContentBlock";

export function ClusterJustificationOptionsExample() {
  return (
    <ContentBlock maxWidth="100%">
      <Stack>
        <Cluster justify="start">
          <Button label="Left" />
          <Button label="Justify" type="secondary" />
        </Cluster>
      </Stack>
      <Stack>
        <Cluster justify="center">
          <Button label="Center" />
          <Button label="Justify" type="secondary" />
        </Cluster>
      </Stack>
      <Stack>
        <Cluster justify="end">
          <Button label="Right" />
          <Button label="Justify" type="secondary" />
        </Cluster>
      </Stack>
    </ContentBlock>
  );
}
