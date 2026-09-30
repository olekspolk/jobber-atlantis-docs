import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Tabs",
  content: () => import("./Tabs.mdx"),
  notes: () => import("./Tabs.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  props,
  component: {
    element: `<Tabs>
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
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-navigation-tabs--basic", "web"),
    },
  ],
} satisfies ComponentContent;
