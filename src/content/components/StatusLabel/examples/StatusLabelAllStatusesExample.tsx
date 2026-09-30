import React from "react";
import { Content } from "@jobber/components/Content";
import { StatusLabel } from "@jobber/components/StatusLabel";

export function StatusLabelAllStatusesExample() {
  return (
    <Content>
      <StatusLabel label="Success" status="success" alignment="start" />
      <StatusLabel label="Critical" status="critical" alignment="start" />
      <StatusLabel label="Informative" status="informative" alignment="start" />
      <StatusLabel label="Warning" status="warning" alignment="start" />
      <StatusLabel label="Inactive" status="inactive" alignment="start" />
    </Content>
  );
}
