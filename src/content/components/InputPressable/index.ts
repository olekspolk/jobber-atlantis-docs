import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputPressable",
  content: () => import("./InputPressable.mdx"),
  notes: () => import("./InputPressable.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  mobileProps,
  component: {
    mobileElement: `<InputPressable
  placeholder={"Placeholder"}
  value={"Mango"}
  onPress={() => {
    alert("👍");
  }}
/>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputpressable--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
