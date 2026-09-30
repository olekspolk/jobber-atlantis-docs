import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputFieldWrapper",
  content: () => import("./InputFieldWrapper.mdx"),
  notes: () => import("./InputFieldWrapper.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  mobileProps,
  component: {
    mobileElement: `<InputFieldWrapper
  placeholder={"Enter a value in cents"}
  prefix={{ icon: "invoice" }}
/>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-private-inputfieldwrapper--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
