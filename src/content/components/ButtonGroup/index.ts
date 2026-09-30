import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "ButtonGroup",
  content: () => import("./ButtonGroup.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  mobileProps,
  component: {
    mobileElement: `<ButtonGroup>
  <ButtonGroup.PrimaryAction
    label={"Create"}
    icon={"plus"}
    onPress={() => alert("create")}
  />
  <ButtonGroup.PrimaryAction
    label={"Edit"}
    icon={"edit"}
    onPress={() => alert("edit")}
  />
  <ButtonGroup.SecondaryAction
    label={"Delete"}
    icon={"trash"}
    onPress={() => alert("delete")}
  />
</ButtonGroup>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-actions-buttongroup--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
