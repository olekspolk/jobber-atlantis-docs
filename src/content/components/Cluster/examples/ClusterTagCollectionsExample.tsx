import React from "react";
import { Cluster } from "@jobber/components/Cluster";
import { Chip } from "@jobber/components/Chip";

export function ClusterTagCollectionsExample() {
  return (
    <Cluster>
      <Chip label="Active" />
      <Chip label="High Priority" />
      <Chip label="In Progress" />
      <Chip label="Needs Review" />
    </Cluster>
  );
}
