import { Content } from "@jobber/components/Content";
import { DataList } from "@jobber/components/DataList";
import { Grid } from "@jobber/components/Grid";
import { InlineLabel } from "@jobber/components/InlineLabel";
import { InputText } from "@jobber/components/InputText";
import { type ReactElement, useState } from "react";
import type { PropGroup } from "../content/parseDocs";

// DataList hands each field back as a rendered element.
type PropItem = Record<"id" | "key" | "required" | "description" | "component", ReactElement>;

export const PropsList = ({ values }: { values: readonly PropGroup[] }) => {
  const [search, setSearch] = useState("");

  return (
    <div data-props-list>
      <Content>
        <InputText
          value={search}
          onChange={(value: string) => setSearch(value)}
          placeholder="Search Props"
        />
        {values.map((group) => {
          const data = group.props
            .filter((prop) => prop.key.toLowerCase().includes(search.toLowerCase()))
            .map((prop) => ({
              id: prop.id,
              key: <pre className="props-key">{prop.key}</pre>,
              required: prop.required ? "*" : "",
              description: prop.description,
              component: prop.type,
            }));

          return (
            <DataList
              key={group.name}
              title={`${group.name} properties`}
              data={data}
              headers={{ key: "Property", description: "Description", component: "Type" }}
              headerVisibility={{ xs: false, lg: true }}
            >
              <DataList.Layout size="md">
                {(item: PropItem) => (
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
                {(item: PropItem) => (
                  <Content spacing="small">
                    <div style={{ display: "flex", gap: "var(--space-small)", flexWrap: "wrap" }}>
                      {item.key}
                      {item.required && <InlineLabel>Required</InlineLabel>}
                    </div>
                    {item.component}
                    {item.description}
                  </Content>
                )}
              </DataList.Layout>
            </DataList>
          );
        })}
      </Content>
    </div>
  );
};
