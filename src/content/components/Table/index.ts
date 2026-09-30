import { getStorybookUrl } from "../../../site/storybook";
import type { ComponentContent } from "../../types";
import props from "./props.json";

export default {
  title: "Table",
  content: () => import("./Table.mdx"),
  notes: () => import("./Table.notes.mdx"),
  toc: [{ id: "component-view-design-&-usage-guidelines", label: "Design & usage guidelines" }],
  props,
  component: {
    element: `<Table>
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
    defaultProps: {},
  },
  links: [
    {
      label: "Web Storybook",
      type: "web",
      url: getStorybookUrl("?path=/story/components-lists-and-tables-table--basic", "web"),
    },
  ],
} satisfies ComponentContent;
