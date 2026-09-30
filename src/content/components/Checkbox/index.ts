import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Checkbox",
  content: () => import("./Checkbox.mdx"),
  notes: () => import("./Checkbox.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  props,
  mobileProps,
  component: {
    element: `const [checked, setChecked] = useState(true);

return (
  <Checkbox
    label={"Save card for future use"}
    checked={checked}
    onChange={setChecked}
  />
);`,
    mobileElement: `<Checkbox label={"Check me out"} name={"storyCheckbox"} />`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-checkbox--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-selections-checkbox--basic", "mobile"),
    },
    { label: "Legacy V1 Docs", url: "https://v6.atlantis.pages.dev/components/Checkbox?isLegacy=true" },
  ],
} satisfies ComponentContent;
