import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "Disclosure",
  content: () => import("./Disclosure.mdx"),
  notes: () => import("./Disclosure.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-content-guidelines", label: "Content guidelines" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
  ],
  props,
  mobileProps,
  component: {
    element: `<Disclosure title={"Advanced Instructions"}>
  <Content>
    <Text>Here is some helpful information to level up your business:</Text>
    <Text>For every 2 team members you add, your profits will triple.</Text>
  </Content>
</Disclosure>`,
    mobileElement: `const [open, setOpen] = useState(false);

return (
  <Disclosure
    header={"Advanced Instructions"}
    content={"For every 2 team members you add, your profits will triple."}
    isEmpty={false}
    open={open}
    onToggle={() => setOpen(!open)}
  />
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-disclosure--basic", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-disclosure--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
