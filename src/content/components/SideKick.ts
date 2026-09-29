import markdown from "../../generated/docs/SideKick.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "SideKick",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-sidekick--basic",
  source: "SideKick/SideKick.tsx",
  example: `const [name, setName] = useState("");

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
} satisfies ComponentSource;
