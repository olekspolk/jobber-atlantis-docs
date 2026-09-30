import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Countdown",
  content: () => import("./Countdown.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
  ],
  props,
  component: {
    element: `<Countdown
  granularity={"dhms"}
  showUnits={true}
  date={new Date(new Date().getTime() + 25 * 3600 * 1000).toISOString()}
/>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-utilities-countdown--basic", "web"),
    },
  ],
} satisfies ComponentContent;
