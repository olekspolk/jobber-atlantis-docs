import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";
import mobileProps from "./mobileProps.json";

export default {
  title: "FormatFile",
  content: () => import("./FormatFile.mdx"),
  notes: () => import("./FormatFile.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  mobileProps,
  component: {
    element: `const file = {
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
    mobileElement: `<FormatFile
  file={{
    fileName: "image.png",
    contentType: "image/png",
    url: "https://picsum.photos/250",
    thumbnailUrl: "https://picsum.photos/250",
    fileSize: 1024,
  }}
/>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-images-and-icons-formatfile--expanded", "web"),
    },
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-images-and-icons-formatfile--image", "mobile"),
    },
  ],
} satisfies ComponentContent;
