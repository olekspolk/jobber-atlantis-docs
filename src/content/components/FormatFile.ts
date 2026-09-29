import markdown from "../../generated/docs/FormatFile.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "FormatFile",
  category: "Images & Icons",
  markdown,
  storybook: "components-images-and-icons-formatfile--expanded",
  source: "FormatFile/FormatFile.tsx",
  example: `const file = {
  key: "abc",
  name: "myballisbigandroundIamrollingitontheground.png",
  type: "image/png",
  size: 213402324,
  progress: 1,
  src: () => {
    return Promise.resolve("https://picsum.photos/250");
  },
};

return (
  <FormatFile
    file={file}
    display={"compact"}
    displaySize={"large"}
    onDelete={() => {
      return alert("Deleted");
    }}
  />
);`,
} satisfies ComponentSource;
