import markdown from "../../generated/docs/Grid.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Grid",
  category: "Layouts & Structure",
  markdown,
  storybook: "components-layouts-and-structure-grid--basic",
  source: "Grid/Grid.tsx",
  example: `<div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
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
} satisfies ComponentSource;
