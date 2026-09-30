import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Banner",
  content: () => import("./Banner.mdx"),
  notes: () => import("./Banner.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behaviour", label: "Behaviour" },
    { id: "component-view-variants", label: "Variants" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-dos-and-don'ts", label: "Dos and Don'ts" },
    { id: "component-view-accessibility-notes", label: "Accessibility notes" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Banner type={"success"}>Account Details Updated</Banner>`,
    mobileElement: `<>
  <Banner type="success">
    <Text>Your import is in progress</Text>
  </Banner>
  <Banner type="warning">
    <Text>Your import is in progress</Text>
  </Banner>
  <Banner type="notice">
    <Text>Your import is in progress</Text>
  </Banner>
  <Banner type="error">
    <Text>Your import is in progress</Text>
  </Banner>
</>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-banner--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-banner--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
