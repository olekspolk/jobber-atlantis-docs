import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonIconsExample() {
  return (
    <Content>
      <Content>
        <Button type="secondary" icon="user" ariaLabel="I'm a person" />
      </Content>
      <Content>
        <Button label="More" type="secondary" icon="more" />
      </Content>
      <Content>
        <Button
          label="Actions"
          type="secondary"
          icon="arrowDown"
          iconOnRight={true}
        />
      </Content>
    </Content>
  );
}
