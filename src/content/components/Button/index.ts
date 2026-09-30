import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Button",
  content: () => import("./Button.mdx"),
  notes: () => import("./Button.notes.mdx"),
  toc: [
    { id: "component-view-summary", label: "Summary" },
    { id: "component-view-anatomy", label: "Anatomy" },
    { id: "component-view-behaviour", label: "Behaviour" },
    { id: "component-view-variants", label: "Variants" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-do's-and-don'ts", label: "Do's and Don'ts" },
    { id: "component-view-accessibility-notes", label: "Accessibility notes" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Button label="Button!" onClick={() => alert("Button Clicked!")}></Button>`,
    mobileElement: `<Button label="Button!" onPress={() => alert("Button Pressed!")}></Button>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-actions-button--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-actions-button--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
