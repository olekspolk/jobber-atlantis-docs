import { Box } from "@jobber/components/Box";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Page } from "@jobber/components/Page";
import { Tab, Tabs } from "@jobber/components/Tabs";
import { type CSSProperties, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ComponentLinks } from "../components/ComponentLinks";
import { Markdown } from "../components/Markdown";
import { PropsList } from "../components/PropsList";
import { FILTER_PICKER_DOCS, FILTER_PICKER_EXAMPLE, FILTER_PICKER_LINKS } from "../content/filterPicker";
import { BaseView } from "../layout/BaseView";
import { AtlantisPreviewEditor } from "../preview/AtlantisPreviewEditor";
import { AtlantisPreviewProvider, useAtlantisPreview } from "../preview/AtlantisPreviewProvider";
import { AtlantisPreviewViewer, CodePreviewWindow } from "../preview/AtlantisPreviewViewer";

export const FILTER_PICKER_PATH = "/components/FilterPicker";

const TABS = ["", "web", "implement"] as const;

const scrollToLater = (selector: string) =>
  setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" }), 100);

const FilterPickerView = () => {
  const { tab: tabParam = "" } = useParams();
  const navigate = useNavigate();
  const { updateCode } = useAtlantisPreview();
  const tab = Math.max(0, TABS.indexOf(tabParam.toLowerCase() as (typeof TABS)[number]));

  const handleTabChange = (index: number) =>
    navigate(TABS[index] ? `${FILTER_PICKER_PATH}/${TABS[index]}` : FILTER_PICKER_PATH);

  // Load the example into the preview, as the site does on mount.
  useEffect(() => {
    const timer = setTimeout(() => updateCode(FILTER_PICKER_EXAMPLE, true), 100);
    return () => clearTimeout(timer);
  }, [updateCode]);

  return (
    <BaseView
      main={
        <Page
          width="narrow"
          title={
            <Box direction="row" gap="small" alignItems="start">
              <Heading level={1}>FilterPicker</Heading>
            </Box>
          }
        >
          <Box>
            <Content spacing="large">
              <Box direction="column" gap="small" alignItems="flex-end">
                <CodePreviewWindow>
                  <AtlantisPreviewViewer />
                </CodePreviewWindow>
              </Box>
              <span style={{ "--public-tab--inset": 0 } as CSSProperties}>
                <Tabs onTabChange={handleTabChange} activeTab={tab}>
                  <Tab label="Design">
                    <Content spacing="large">
                      <Markdown source={FILTER_PICKER_DOCS.design} />
                    </Content>
                  </Tab>
                  <Tab label="Web">
                    <div data-usage-tab="web">
                      <Box margin={{ bottom: "base" }}>
                        <div style={{ position: "relative" }}>
                          <AtlantisPreviewEditor />
                        </div>
                      </Box>
                      <PropsList values={FILTER_PICKER_DOCS.props} />
                    </div>
                  </Tab>
                  <Tab label="Implement">
                    <Content spacing="large">
                      <Markdown source={FILTER_PICKER_DOCS.implement} />
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
          toc={FILTER_PICKER_DOCS.toc}
          links={FILTER_PICKER_LINKS}
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

export const FilterPickerPage = () => (
  <AtlantisPreviewProvider>
    <FilterPickerView />
  </AtlantisPreviewProvider>
);
