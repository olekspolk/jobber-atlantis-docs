import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonDestructiveExample() {
  return (
    <Content>
      <Content>
        <Button label="Delete" variation="destructive" />
      </Content>
      <Content>
        <Button label="Delete" variation="destructive" type="secondary" />
      </Content>
      <Content>
        <Button label="Delete" variation="destructive" type="tertiary" />
      </Content>
    </Content>
  );
}
