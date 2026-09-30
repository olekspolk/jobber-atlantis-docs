import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonWorkExample() {
  return (
    <Content>
      <Content>
        <Button label="Do the Thing" />
      </Content>
      <Content>
        <Button label="Do the Thing" type="secondary" />
      </Content>
      <Content>
        <Button label="Do the Thing" type="tertiary" />
      </Content>
    </Content>
  );
}
