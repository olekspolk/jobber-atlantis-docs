import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputPassword",
  content: () => import("./InputPassword.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-clearable", label: "Clearable" },
  ],
  mobileProps,
  component: {
    mobileElement: `<InputPassword placeholder={"Password In"} />`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputpassword--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
