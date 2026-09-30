import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Grid",
  content: () => import("./Grid.mdx"),
  notes: () => import("./Grid.notes.mdx"),
  toc: [
    { id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" },
    { id: "component-view-related-components", label: "Related components" },
  ],
  props,
  component: {
    element: `<div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
  <Grid gap={true}>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
    <Grid.Cell
      size={{
        xs: 1,
      }}
    >
      <Box
        background={"base-blue--500"}
        height={220}
        width={36}
        radius={"base"}
      ></Box>
    </Grid.Cell>
  </Grid>
</div>`,
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-layouts-and-structure-grid--basic", "web"),
    },
  ],
} satisfies ComponentContent;
