import { Box } from "@jobber/components/Box";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Page } from "@jobber/components/Page";
import { Tab, Tabs } from "@jobber/components/Tabs";
import { type CSSProperties, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ComponentLinks } from "../components/ComponentLinks";
import { Markdown } from "../components/Markdown";
import { PropsList } from "../components/PropsList";
import { COMPONENTS, type ComponentDocs, findComponent } from "../content/registry";
import { BaseView } from "../layout/BaseView";
import { AtlantisPreviewEditor } from "../preview/AtlantisPreviewEditor";
import { AtlantisPreviewProvider, useAtlantisPreview } from "../preview/AtlantisPreviewProvider";
import { AtlantisPreviewViewer, CodePreviewWindow } from "../preview/AtlantisPreviewViewer";

const TABS = ["", "web", "implement"] as const;

const scrollToLater = (selector: string) =>
  setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" }), 100);

const ComponentView = ({ component }: { component: ComponentDocs }) => {
  const { tab: tabParam = "" } = useParams();
  const navigate = useNavigate();
  const { updateCode } = useAtlantisPreview();
  const tab = Math.max(0, TABS.indexOf(tabParam.toLowerCase() as (typeof TABS)[number]));

  const handleTabChange = (index: number) =>
    navigate(TABS[index] ? `${component.path}/${TABS[index]}` : component.path);

  useEffect(() => {
    document.title = `${component.name} - Atlantis`;
  }, [component.name]);

  // Load the example into the preview, as the site does on mount.
  useEffect(() => {
    const timer = setTimeout(() => updateCode(component.example, true), 100);
    return () => clearTimeout(timer);
  }, [updateCode, component.example]);

  return (
    <BaseView
      main={
        <Page
          width="narrow"
          title={
            <Box direction="row" gap="small" alignItems="start">
              <Heading level={1}>{component.name}</Heading>
            </Box>
          }
        >
          <Box>
            <Content spacing="large">
              <Box direction="column" gap="small" alignItems="flex-end">
                <CodePreviewWindow>
                  <AtlantisPreviewViewer maxHeight={component.previewMaxHeight} />
                </CodePreviewWindow>
              </Box>
              <span style={{ "--public-tab--inset": 0 } as CSSProperties}>
                <Tabs onTabChange={handleTabChange} activeTab={tab}>
                  <Tab label="Design">
                    <Content spacing="large">
                      <Markdown source={component.docs.design} />
                    </Content>
                  </Tab>
                  <Tab label="Web">
                    <div data-usage-tab="web">
                      <Box margin={{ bottom: "base" }}>
                        <div style={{ position: "relative" }}>
                          <AtlantisPreviewEditor />
                        </div>
                      </Box>
                      <PropsList values={component.docs.props} />
                    </div>
                  </Tab>
                  <Tab label="Implement">
                    <Content spacing="large">
                      <Markdown source={component.docs.implement} />
                    </Content>
                  </Tab>
                </Tabs>
              </span>
            </Content>
          </Box>
        </Page>
      }
      siderail={
        <ComponentLinks
          toc={component.docs.toc}
          links={component.links}
          goToUsage={() => {
            handleTabChange(1);
            scrollToLater('[data-usage-tab="web"]');
          }}
          goToProps={() => {
            handleTabChange(1);
            scrollToLater("[data-props-list]");
          }}
        />
      }
    />
  );
};

export const ComponentPage = () => {
  const { name } = useParams();
  const component = findComponent(name);
  if (!component) return <Navigate to={COMPONENTS[0].path} replace />;

  // Keyed by component: another component's page starts with a fresh preview and editor.
  return (
    <AtlantisPreviewProvider key={component.name}>
      <ComponentView component={component} />
    </AtlantisPreviewProvider>
  );
};
