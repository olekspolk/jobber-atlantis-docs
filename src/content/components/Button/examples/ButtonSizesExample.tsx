import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonSizesExample() {
  return (
    <Content>
      <Content>
        <Button label="Small" size="small" />
      </Content>
      <Content>
        <Button label="Base" />
      </Content>
      <Content>
        <Button label="Large" size="large" />
      </Content>
    </Content>
  );
}
