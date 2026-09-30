import { Content } from "@jobber/components/Content";
import { DataList } from "@jobber/components/DataList";
import { Grid } from "@jobber/components/Grid";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { InputText } from "@jobber/components/InputText";
import { type ReactElement, useMemo, useState } from "react";
import type { PropsEntry } from "../content/types";

interface PropRow {
  readonly id: number;
  readonly key: string;
  readonly required: string;
  readonly description?: string;
  readonly component?: string;
}

// react-docgen's props, one list per component (Menu, Menu.Item...), as the site's DataList.
const usePropsAsDataList = (props: readonly PropsEntry[] | undefined) =>
  useMemo(
    () =>
      (props ?? []).map((entry) => ({
        name: entry.displayName,
        props: Object.entries(entry.props).map(
          ([key, prop], index): PropRow => ({
            id: index,
            key,
            required: prop?.required ? "*" : "",
            description: prop?.description,
            component: prop?.type?.name,
          }),
        ),
      })),
    [props],
  );

type DataItem = Record<keyof PropRow, ReactElement>;

export const PropsList = ({ props }: { props: readonly PropsEntry[] | undefined }) => {
  const values = usePropsAsDataList(props);
  const [search, setSearch] = useState("");
  const filteredValues = values.map((meta) => ({
    ...meta,
    props: meta.props
      .filter((prop) => prop.key.toLowerCase().includes(search.toLowerCase()))
      .map((prop) => ({ ...prop, key: <pre>{prop.key}</pre> })),
  }));

  return (
    <div data-props-list>
      <Content>
        <InputText value={search} onChange={(value: string) => setSearch(value)} placeholder="Search Props" />
        {filteredValues.map((value, index) => (
          <DataList
            title={`${value.name} properties`}
            data={value.props}
            headers={{ key: "Property", description: "Description", component: "Type" }}
            headerVisibility={{ xs: false, lg: true }}
            key={index}
          >
            <DataList.Layout size="md">
              {(item: DataItem) => (
                <Grid>
                  <Grid.Cell size={{ md: 5, lg: 3 }}>
                    <div style={{ display: "flex", gap: "var(--space-small)", flexWrap: "wrap" }}>
                      {item.key}
                      {item.required && <InlineLabel>Required</InlineLabel>}
                    </div>
                  </Grid.Cell>
                  <Grid.Cell size={{ md: 7, lg: 3 }}>{item.component}</Grid.Cell>
                  <Grid.Cell size={{ md: 12, lg: 6 }}>{item.description}</Grid.Cell>
                </Grid>
              )}
            </DataList.Layout>
            <DataList.Layout size="xs">
              {(item: DataItem) => (
                <Grid>
                  <Grid.Cell size={{ xs: 12 }}>
                    <div style={{ display: "flex", gap: "var(--space-smaller", flexWrap: "wrap" }}>
                      {item.key}
                      {item.required && <InlineLabel>Required</InlineLabel>}
                    </div>
                  </Grid.Cell>
                  <Grid.Cell size={{ xs: 12 }}>{item.component}</Grid.Cell>
                  <Grid.Cell size={{ xs: 12 }}>{item.description}</Grid.Cell>
                </Grid>
              )}
            </DataList.Layout>
            <DataList.EmptyState type="filtered" message="No props found with your search criteria." />
          </DataList>
        ))}
      </Content>
    </div>
  );
};
