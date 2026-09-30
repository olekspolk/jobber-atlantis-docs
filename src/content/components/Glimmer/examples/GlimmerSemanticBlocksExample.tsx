import React from "react";
import { Glimmer } from "@jobber/components/Glimmer";
import { Tab, Tabs } from "@jobber/components/Tabs";

export function GlimmerSemanticBlocksExample() {
  return (
    <Tabs>
      <Tab label={"Glimmer.Header"}>
        <Glimmer.Header />
      </Tab>
      <Tab label={"Glimmer.Text"}>
        <Glimmer.Text />
      </Tab>
      <Tab label={"Glimmer.Button"}>
        <Glimmer.Button />
      </Tab>
    </Tabs>
  );
}
