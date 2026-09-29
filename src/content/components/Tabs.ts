import markdown from "../../generated/docs/Tabs.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Tabs",
  category: "Navigation",
  markdown,
  storybook: "components-navigation-tabs--basic",
  source: "Tabs/Tabs.tsx",
  example: `<Tabs>
  <Tab label={"Eggs"}>
    🍳 Some eggs are laid by female animals of many different species, including
    birds, reptiles, amphibians, mammals, and fish, and have been eaten by
    humans for thousands of years.
  </Tab>
  <Tab label="Cheese">
    🧀 Cheese is a dairy product derived from milk that is produced in a wide
    range of flavors, textures, and forms by coagulation of the milk protein
    casein.
  </Tab>
  <Tab label="Berries">
    🍓 A berry is a small, pulpy, and often edible fruit. Typically, berries are
    juicy, rounded, brightly colored, sweet, sour or tart, and do not have a
    stone or pit.
  </Tab>
</Tabs>`,
} satisfies ComponentSource;
