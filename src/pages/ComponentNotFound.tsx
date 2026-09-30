import { Box } from "@jobber/components/Box";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Link } from "@jobber/components/Link";
import { List } from "@jobber/components/List";
import { Page } from "@jobber/components/Page";

// Where the 404 of a missing component sends developers on localhost: the site's steps to add one.
export const ComponentNotFound = () => (
  <Page width="fill" title="Component not found">
    <Box padding="base" direction="column">
      <Content>
        <Heading level={2}>Steps to (possibly) correct</Heading>
        <Box>
          <Card>
            <List
              items={[
                { content: "Add new entry to componentList.ts", id: 1 },
                {
                  content:
                    "Add a new folder under src/content that matches the title used above. Use Button or Chip as an example",
                  id: 2,
                },
                { content: "In baseComponentLists.mjs, add the new key you just used for the folder (componentName)", id: 3 },
                { content: "Run **pnpm run generate** within packages/site to generate props files", id: 4 },
                { content: "Add a new entry to site/src/content/index.ts that matches your title", id: 5 },
                { content: "Reload this page", id: 6 },
              ]}
            />
          </Card>
        </Box>
        <Box>
          <Link url="/components">Back to components</Link>
        </Box>
      </Content>
    </Box>
  </Page>
);
