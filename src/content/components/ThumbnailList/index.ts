import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import mobileProps from "./mobileProps.json";

export default {
  title: "ThumbnailList",
  content: () => import("./ThumbnailList.mdx"),
  toc: [],
  mobileProps,
  component: {
    mobileElement: `<ThumbnailList
  files={[
    {
      contentType: "image/png",
      fileName: "image.png",
      thumbnailUrl: "https://picsum.photos/250",
      url: "https://picsum.photos/250",
      fileSize: 1024,
    },
    {
      contentType: "image/png",
      fileName: "atlantis.png",
      thumbnailUrl: "https://picsum.photos/250",
      url: "https://picsum.photos/250",
      fileSize: 1024,
    },
    {
      contentType: "image/png",
      fileName: "components.png",
      thumbnailUrl: "https://picsum.photos/250",
      url: "https://picsum.photos/250",
      fileSize: 1024,
    },
    {
      contentType: "image/png",
      fileName: "storybook.png",
      thumbnailUrl: "https://picsum.photos/250",
      url: "https://picsum.photos/250",
      fileSize: 1024,
    },
    {
      contentType: "image/png",
      fileName: "storybook2.png",
      thumbnailUrl: "https://picsum.photos/250",
      url: "https://picsum.photos/250",
      fileSize: 1024,
    },
    {
      contentType: "image/png",
      fileName: "components2.png",
      thumbnailUrl: "https://picsum.photos/250",
      url: "https://picsum.photos/250",
      fileSize: 1024,
    },
  ]}
  rowCount={2}
/>`,
  },
  links: [
    {
      label: "Mobile Storybook",
      type: "mobile",
      url: getStorybookUrl("?path=/story/components-images-and-icons-thumbnaillist--basic", "mobile"),
    },
  ],
} satisfies ComponentContent;
