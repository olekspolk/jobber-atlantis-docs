import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Gallery",
  content: () => import("./Gallery.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-responsiveness", label: "Responsiveness" },
    { id: "component-view-accessibility", label: "Accessibility" },
    { id: "component-view-download-formats", label: "Download formats" },
    { id: "component-view-mockup", label: "Mockup" },
  ],
  props,
  component: {
    element: `<Gallery
  files={[
    {
      key: "abc",
      name: "myballisbigandroundIamrollingitontheground.png",
      type: "image/png",
      size: 213402324,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "def",
      name: "iamanimage.png",
      type: "image/png",
      size: 124525234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "efg",
      name: "upanddown.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "jkl",
      name: "kramer.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "mno",
      name: "boston.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "pqr",
      name: "pizzaisgood.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "pQ=",
      name: "avatar.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "fGr",
      name: "whatevenisthat.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
    {
      key: "AM=",
      name: "stairs.png",
      type: "image/png",
      size: 233411234,
      progress: 1,
      thumbnailSrc: "https://picsum.photos/250",
      src: "https://picsum.photos/550",
    },
  ]}
/>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-images-and-icons-gallery--basic", "web"),
    },
  ],
  previewMaxHeight: 500,
} satisfies ComponentContent;
