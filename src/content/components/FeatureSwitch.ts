import markdown from "../../generated/docs/FeatureSwitch.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "FeatureSwitch",
  category: "Selections",
  markdown,
  storybook: "components-selections-featureswitch--basic",
  source: "FeatureSwitch/FeatureSwitch.tsx",
  example: `const [featureEnabled, setFeatureEnabled] = useState(true);

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
} satisfies ComponentSource;
