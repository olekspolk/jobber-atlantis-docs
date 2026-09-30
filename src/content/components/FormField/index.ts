import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "FormField",
  content: () => import("./FormField.mdx"),
  notes: () => import("./FormField.notes.mdx"),
  toc: [{ id: "component-view-related-components", label: "Related components" }],
  mobileProps,
  component: {
    mobileElement: `<FormField name={"name"}>
  {(field) => <InputText value={field.value} placeholder="Enter name here" />}
</FormField>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-private-formfield--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
