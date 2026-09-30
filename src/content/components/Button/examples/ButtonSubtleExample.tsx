import React from "react";
import { Button } from "@jobber/components/Button";
import { Content } from "@jobber/components/Content";

export function ButtonSubtleExample() {
  return (
    <Content>
      <Content>
        <Content>
          <Button label="Cancel" type="primary" variation="subtle" />
        </Content>
        <Content>
          <Button label="Dismiss" type="secondary" variation="subtle" />
        </Content>
        <Content>
          <Button label="Maybe Later" type="tertiary" variation="subtle" />
        </Content>
      </Content>
      <div
        style={{
          backgroundColor: "var(--color-surface--background)",
          padding: "var(--space-base)",
        }}
      >
        <Button
          variation="subtle"
          type="tertiary"
          icon="search"
          aria-label="search"
        />
        <Button
          variation="subtle"
          type="tertiary"
          icon="cog"
          aria-label="settings"
        />
        <Button
          variation="subtle"
          type="tertiary"
          icon="help"
          aria-label="help"
        />
        <Button
          variation="subtle"
          type="tertiary"
          icon="more"
          aria-label="more"
        />
      </div>
    </Content>
  );
}
