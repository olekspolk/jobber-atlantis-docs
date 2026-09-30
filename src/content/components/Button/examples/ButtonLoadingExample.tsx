import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonLoadingExample() {
  return (
    <Content>
      <Content>
        <Button
          label="Deleting..."
          type="primary"
          variation="destructive"
          loading={true}
        />
      </Content>
      <Content>
        <Button
          label="Loading..."
          type="tertiary"
          variation="learning"
          loading={true}
        />
      </Content>
      <Content>
        <Button label="Canceling..." variation="subtle" loading={true} />
      </Content>
    </Content>
  );
}
