import React from "react";
import { Cluster } from "@jobber/components/Cluster";
import { Button } from "@jobber/components/Button";

export function ClusterBasicUsageExample() {
  return (
    <Cluster>
      <Button label="Save" />
      <Button label="Cancel" type="secondary" />
      <Button label="Delete" variation="destructive" type="secondary" />
    </Cluster>
  );
}
