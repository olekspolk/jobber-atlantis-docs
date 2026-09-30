import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "FeatureSwitch",
  content: () => import("./FeatureSwitch.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `const [featureEnabled, setFeatureEnabled] = useState(true);

function handleSwitch(newValue) {
  setFeatureEnabled(newValue);
}

return (
  <FeatureSwitch
    title={"Quote follow-up"}
    description={
      "Send a notification to your client following up on an outstanding quote."
    }
    hasSaveIndicator={true}
    enabled={featureEnabled}
    onSwitch={handleSwitch}
    onEdit={() => console.log("You clicked edit")}
  >
    <Text>Extra feature content and information</Text>
  </FeatureSwitch>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-selections-featureswitch--basic", "web"),
    },
  ],
} satisfies ComponentContent;
