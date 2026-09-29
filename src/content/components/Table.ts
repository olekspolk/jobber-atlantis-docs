import markdown from "../../generated/docs/Table.md?raw";
import type { ComponentSource } from "../registry";

export default {
  name: "Table",
  category: "Lists & Tables",
  markdown,
  storybook: "components-lists-and-tables-table--basic",
  source: "Table/Table.tsx",
  example: `<Table>
  <Header>
    <Cell>Ship</Cell>
    <Cell>Class</Cell>
    <Cell align="right">Cost</Cell>
    <Cell align="right">Crew</Cell>
  </Header>
  <Body>
    <Row>
      <Cell>Nostromo</Cell>
      <Cell>Towing Vehicle</Cell>
      <CellCurrency value={42000000} />
      <CellNumeric value={7} />
    </Row>
    <Row>
      <Cell>Rodger Young</Cell>
      <Cell>Corvette Transport</Cell>
      <Cell />
      <CellNumeric value={200} />
    </Row>
    <Row>
      <Cell>USS Enterprise</Cell>
      <Cell>Constitution</Cell>
      <Cell />
      <CellNumeric value={205} />
    </Row>
  </Body>
  <Footer>
    <Cell />
    <Cell />
    <Cell />
    <CellNumeric value={412} />
  </Footer>
</Table>`,
} satisfies ComponentSource;
