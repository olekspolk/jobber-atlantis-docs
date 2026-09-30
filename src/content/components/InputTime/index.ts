import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "InputTime",
  content: () => import("./InputTime.mdx"),
  notes: () => import("./InputTime.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  mobileProps,
  component: {
    element: `const [time, setTime] = useState(new Date());
return <InputTime value={time} onChange={setTime} />;`,
    mobileElement: `const [time, setTime] = useState(new Date("2023-07-21T16:36:34.873Z"));

return <InputTime value={time} onChange={setTime} />;`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputtime--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-forms-and-inputs-inputtime--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/InputTime?isLegacy=true" },
  ],
} satisfies ComponentContent;
