import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputCurrency",
  content: () => import("./InputCurrency.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  mobileProps,
  component: {
    mobileElement: `<InputCurrency placeholder="Unit Price" />`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputcurrency--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
