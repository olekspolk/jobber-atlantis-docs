import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonLearningExample() {
  return (
    <Content>
      <Content>
        <Button
          label="Learn More"
          variation="learning"
          url="//getjobber.com"
          external={true}
        />
      </Content>
      <Content>
        <Button
          label="Learn More"
          variation="learning"
          type="secondary"
          url="//getjobber.com"
          external={true}
        />
      </Content>
      <Content>
        <Button
          label="Learn More"
          variation="learning"
          type="tertiary"
          url="//getjobber.com"
          external={true}
        />
      </Content>
    </Content>
  );
}
