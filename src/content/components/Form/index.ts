import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "Form",
  content: () => import("./Form.mdx"),
  notes: () => import("./Form.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usages-guidelines", label: "Design & usages guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-setup", label: "Setup" },
    { id: "component-view-accessibility", label: "Accessibility" },
  ],
  mobileProps,
  component: {
    mobileElement: `<Form
  localCacheKey="form"
  initialValues={{ firstName: "Greatest", lastName: "Ever", nickName: "" }}
  onSubmit={(value) => {
    console.log(JSON.stringify(value, void 0));
  }}
>
  <Content>
    <InputText
      name="firstName"
      placeholder="First name"
      validations={{ required: "Please add a first name" }}
    />
    <InputText
      name="lastName"
      placeholder="Last name"
      validations={{ required: "Please add a last name" }}
    />
    <InputText
      name="nickName"
      placeholder="Nick name"
      validations={{ required: "Please add a nick name" }}
    />
  </Content>
</Form>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-form--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
