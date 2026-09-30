import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "SideKick",
  content: () => import("./SideKick.mdx"),
  props,
  component: {
    element: `const [name, setName] = useState("");

return (
  <ContentBlock maxWidth="100%">
    <SideKick contentMinWidth="80%" sideWidth="70px">
      <InputText
        placeholder="Name"
        label="Name"
        value={name}
        onChange={setName}
      />
      <Button>
        <Button.Label>Submit</Button.Label>
      </Button>
    </SideKick>
  </ContentBlock>
);`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-sidekick--basic", "web"),
    },
  ],
} satisfies ComponentContent;
