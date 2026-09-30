import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Toast",
  content: () => import("./Toast.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Button
  label="Show toast"
  onClick={() => showToast({ message: "Showed toast" })}
/>`,
    mobileElement: `<>
  <Button
    label="Show toast"
    onPress={() => {
      alert("A toast shows on your mobile device!");
      showToast({ message: "Showed toast" });
    }}
  />
  <Toast />
</>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-toast--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-status-and-feedback-toast--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
