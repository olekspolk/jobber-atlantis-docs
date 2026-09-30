import { Box } from "@jobber/components/Box";
import { Chip } from "@jobber/components/Chip";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { Menu } from "@jobber/components/Menu";
import { Page } from "@jobber/components/Page";
import { Tab, Tabs } from "@jobber/components/Tabs";
import { showToast } from "@jobber/components/Toast";
import {
  type CSSProperties,
  type ComponentProps,
  Suspense,
  createElement,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { ComponentLinks } from "../components/ComponentLinks";
import { LinkableHeading } from "../components/LinkableHeading";
import { SiteContent } from "../content/components";
import { highlightAll } from "../content/mdx/prism";
import type { ComponentContent } from "../content/types";
import { BaseView } from "../layout/BaseView";
import { PageShell } from "../layout/PageShell";
import { AtlantisPreviewProvider, useAtlantisPreview } from "../preview/AtlantisPreviewProvider";
import { AtlantisPreviewViewer, CodePreviewWindow } from "../preview/AtlantisPreviewViewer";
import { useAtlantisSite, useSiteSearch } from "../site/AtlantisSiteContext";
import {
  type ComponentKind,
  type Platform,
  getAvailableComponentTypes,
  getAvailablePlatformTypes,
  getAvailableVersionsForPlatform,
  getComponentContent,
  getComponentElement,
  getComponentGithubLinks,
  getComponentLinks,
  getComponentNotes,
  getComponentProps,
  getComponentTypeConfig,
  getDefaultComponentType,
  getPlatformForComponentType,
  resolveComponentTypeFromRoute,
} from "../site/componentTypes";
import { markPageReady } from "../site/pageReady";
import { scrollToHash } from "../site/scrollToHash";
import { usePageTitle } from "../site/usePageTitle";
import type { ComponentUsage } from "./ComponentUsage";
import { DocumentReady, useDocument } from "./documents";
import { NotFoundPage } from "./NotFoundPage";

const DESIGN_TAB_INDEX = 0;

// The Web and Mobile tabs' content (the editor and the props) loads with the first of those tabs
// shown. Once loaded it is read synchronously, so a page opened on one of them renders it with the
// rest of the page rather than after it.
let usageModule: typeof import("./ComponentUsage") | undefined;
let usageLoading: Promise<typeof import("./ComponentUsage")> | undefined;
const loadUsage = () =>
  (usageLoading ??= import("./ComponentUsage").then(
    (module) => (usageModule = module),
    (error: unknown) => {
      usageLoading = undefined;
      throw error;
    },
  ));

const Usage = (props: ComponentProps<typeof ComponentUsage>) => {
  const { ComponentUsage: LoadedUsage } = usageModule ?? use(loadUsage());
  return <LoadedUsage {...props} />;
};

const versionLabelMap: Record<ComponentKind, string> = {
  web: "Deprecated (v1)",
  webSupported: "Supported (v2)",
  mobile: "Mobile",
};

// A component with both a deprecated and a supported web version lets the reader pick one.
const VersionSelector = ({
  availableVersions,
  currentVersion,
  onVersionChange,
}: {
  availableVersions: readonly ComponentKind[];
  currentVersion: ComponentKind;
  onVersionChange: (type: ComponentKind) => void;
}) => {
  if (availableVersions.length <= 1) return null;
  return (
    <Box direction="row" gap="small" alignItems="center">
      <Menu>
        <Menu.Trigger>
          <Chip heading="Version" label={versionLabelMap[currentVersion]} />
        </Menu.Trigger>
        <Menu.Content>
          {availableVersions.map((version) => (
            <Menu.Item textValue={versionLabelMap[version]} onClick={() => onVersionChange(version)} key={version}>
              <Menu.ItemLabel>{versionLabelMap[version]}</Menu.ItemLabel>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu>
    </Box>
  );
};

// Tab index ↔ URL: /components/Button is Design, /web and /mobile the platforms, /implement the notes.
function getTabAndTypeFromUrl({
  tabFromUrl,
  availablePlatforms,
  availableTypes,
  defaultType,
  isLegacy,
}: {
  tabFromUrl: string;
  availablePlatforms: readonly Platform[];
  availableTypes: readonly ComponentKind[];
  defaultType: ComponentKind;
  isLegacy: boolean;
}) {
  const resolve = () => resolveComponentTypeFromRoute({ tab: tabFromUrl, isLegacy, availableTypes, defaultType });
  if (!tabFromUrl || tabFromUrl.trim() === "") return { tabIndex: DESIGN_TAB_INDEX, resolvedType: resolve() };
  const platformIndex = availablePlatforms.indexOf(tabFromUrl as Platform);
  if (tabFromUrl === "implement") return { tabIndex: availablePlatforms.length + 1, resolvedType: resolve() };
  if (platformIndex !== -1) return { tabIndex: platformIndex + 1, resolvedType: resolve() };
  return { tabIndex: DESIGN_TAB_INDEX, resolvedType: null };
}

function getComponentUrlForTab({ name, availablePlatforms, tabIndex }: { name: string; availablePlatforms: readonly Platform[]; tabIndex: number }) {
  if (!name) return null;
  const basePath = `/components/${name}`;
  if (tabIndex === 0) return basePath;
  if (tabIndex >= 1 && tabIndex <= availablePlatforms.length) return `${basePath}/${availablePlatforms[tabIndex - 1]}`;
  if (tabIndex === availablePlatforms.length + 1) return `${basePath}/implement`;
  return basePath;
}

function useComponentViewTabs({
  PageMeta,
  updateType,
  tabFromUrl,
  isLegacy,
}: {
  PageMeta: ComponentContent;
  updateType: (type: ComponentKind) => void;
  tabFromUrl: string;
  isLegacy: boolean;
}) {
  const navigate = useNavigate();
  const { search } = useLocation();
  const { name = "" } = useParams();
  const defaultType = useMemo(() => getDefaultComponentType(PageMeta), [PageMeta]);
  const currentPlatform = useMemo(() => getPlatformForComponentType(defaultType), [defaultType]);
  const availablePlatforms = useMemo(() => getAvailablePlatformTypes(PageMeta), [PageMeta]);
  const availableTypes = useMemo(() => getAvailableComponentTypes(PageMeta), [PageMeta]);
  const fromUrl = useCallback(
    () => getTabAndTypeFromUrl({ tabFromUrl, availablePlatforms, availableTypes, defaultType, isLegacy }),
    [tabFromUrl, availablePlatforms, availableTypes, defaultType, isLegacy],
  );
  const [tab, setTab] = useState(() => fromUrl().tabIndex);

  useEffect(() => {
    const next = fromUrl();
    setTab(next.tabIndex);
    if (next.resolvedType) updateType(next.resolvedType);
  }, [fromUrl, updateType]);

  // Code in the document is highlighted again whenever a tab shows.
  useEffect(() => {
    requestAnimationFrame(highlightAll);
  }, []);

  // The page's search parameters (?isLegacy, ?minimal, ?theme) carry over to the tab's URL.
  const setAndNavigateTab = (tabIndex: number) => {
    setTab(tabIndex);
    const url = getComponentUrlForTab({ name, availablePlatforms, tabIndex });
    if (url) navigate({ pathname: url, search });
    requestAnimationFrame(highlightAll);
  };

  const handleTabChange = (tabIn: number) => {
    if (tabIn >= 1 && tabIn <= availablePlatforms.length) {
      const targetPlatform = availablePlatforms[tabIn - 1];
      if (targetPlatform && currentPlatform !== targetPlatform) {
        const versions = getAvailableVersionsForPlatform(PageMeta, targetPlatform);
        if (versions.length > 0) updateType(versions[0]);
      }
    }
    setAndNavigateTab(tabIn);
  };

  return { tab, handleTabChange };
}

// Errors thrown in the page (an example that fails) show as a toast instead of a blank page.
function useErrorCatcher() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (event.type === "error" && event.message) {
        showToast({ message: event.message });
        event.preventDefault();
      }
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  });
}

const ComponentView = ({ PageMeta }: { PageMeta: ComponentContent }) => {
  const { name = "", tab: tabParam } = useParams();
  const { isLegacy } = useSiteSearch();
  const { updateCode, type, updateType } = useAtlantisPreview();
  const tabFromUrl = tabParam?.toLowerCase().trim() ?? "";
  const availablePlatforms = useMemo(() => getAvailablePlatformTypes(PageMeta), [PageMeta]);
  const currentPlatform = getPlatformForComponentType(type);
  const availableVersionsForCurrentPlatform = useMemo(
    () => getAvailableVersionsForPlatform(PageMeta, currentPlatform),
    [PageMeta, currentPlatform],
  );
  const { tab, handleTabChange } = useComponentViewTabs({ PageMeta, updateType, tabFromUrl, isLegacy });
  useErrorCatcher();
  const { enableMinimal, minimal, disableMinimal, isMinimal, setComponentTypeInUrl } = useAtlantisSite();
  usePageTitle(PageMeta.title);

  useEffect(() => {
    if (minimal.requested && !minimal.enabled) enableMinimal();
    return () => disableMinimal();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const Design = useDocument(getComponentContent(PageMeta, type));
  const Notes = useDocument(getComponentNotes(PageMeta, type));
  const code = getComponentElement(PageMeta, type);
  // The preview starts once the tab's document is in the page (a Web or Mobile tab has none): its
  // frame and the module the frame loads would otherwise hold the document up on a slow connection.
  const tabHasDocument = tab === DESIGN_TAB_INDEX || (Notes !== null && tab === availablePlatforms.length + 1);
  const [previewStarted, setPreviewStarted] = useState(!tabHasDocument);
  // The documents load after the tab shows: their code is highlighted, and a link's heading
  // scrolled to, once they are in the page.
  const onDocumentReady = () => {
    requestAnimationFrame(highlightAll);
    scrollToHash();
    setPreviewStarted(true);
    markPageReady();
  };

  useEffect(() => {
    if (tabHasDocument) return;
    setPreviewStarted(true);
    markPageReady();
  }, [tabHasDocument]);

  useEffect(() => {
    if (!code || !previewStarted) return;
    const timer = setTimeout(() => updateCode(code, true), 100);
    return () => clearTimeout(timer);
  }, [code, type, updateCode, previewStarted]);

  const tabs = [
    {
      label: "Design",
      children: (
        <Content spacing="large">
          {/* Keyed: the Implement tab renders the same shape, and each document must mount its own
              DocumentReady. */}
          <Suspense fallback={null} key="design">
            {Design && createElement(Design, { components: { h2: LinkableHeading } })}
            <DocumentReady onReady={onDocumentReady} />
          </Suspense>
        </Content>
      ),
    },
    ...availablePlatforms.flatMap((platform) => {
      const versions = getAvailableVersionsForPlatform(PageMeta, platform);
      if (versions.length === 0) return [];
      const config = getComponentTypeConfig(versions[0]);
      return [
        {
          label: config.platform === "web" ? "Web" : "Mobile",
          children: (
            <div data-usage-tab={platform}>
              <Suspense fallback={null}>
                <Usage warningMessage={config.warningMessage} props={getComponentProps(PageMeta, type)} />
              </Suspense>
            </div>
          ),
        },
      ];
    }),
    ...(Notes
      ? [
          {
            label: "Implement",
            children: (
              <Content spacing="large">
                <Suspense fallback={null} key="notes">
                  {createElement(Notes)}
                  <DocumentReady onReady={onDocumentReady} />
                </Suspense>
              </Content>
            ),
          },
        ]
      : []),
  ];

  const goTo = (typeIn: ComponentKind, selector: string) => {
    const platformIndex = availablePlatforms.indexOf(getPlatformForComponentType(typeIn));
    if (platformIndex === -1) return;
    updateType(typeIn);
    handleTabChange(platformIndex + 1);
    setTimeout(() => document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  return (
    <BaseView>
      <BaseView.Main>
        <Page
          width="narrow"
          title={
            <Box direction="row" gap="small" alignItems="start">
              <Heading level={1}>{PageMeta.title}</Heading>
              <VersionSelector
                availableVersions={availableVersionsForCurrentPlatform}
                currentVersion={type}
                onVersionChange={(newType) => {
                  updateType(newType);
                  setComponentTypeInUrl(newType);
                }}
              />
            </Box>
          }
        >
          <Box>
            <Content spacing="large">
              <Box direction="column" gap="small" alignItems="flex-end">
                <CodePreviewWindow>
                  <AtlantisPreviewViewer maxHeight={PageMeta.previewMaxHeight} />
                </CodePreviewWindow>
              </Box>
              <span style={{ "--public-tab--inset": 0 } as CSSProperties}>
                <Tabs onTabChange={handleTabChange} activeTab={tab}>
                  {tabs.map((activeTab, index) => (
                    <Tab label={activeTab.label} key={index}>
                      {activeTab.children}
                    </Tab>
                  ))}
                </Tabs>
              </span>
            </Content>
          </Box>
        </Page>
      </BaseView.Main>
      <BaseView.Siderail visible={!isMinimal}>
        <ComponentLinks
          links={[...(getComponentLinks(PageMeta, type) ?? []), ...getComponentGithubLinks(PageMeta, type)]}
          toc={PageMeta.toc}
          availablePlatforms={availablePlatforms}
          goToProps={(typeIn) => goTo(typeIn, "[data-props-list]")}
          goToUsage={(typeIn) => goTo(typeIn, `[data-usage-tab="${getPlatformForComponentType(typeIn)}"]`)}
          key={`component-${name}`}
        />
      </BaseView.Siderail>
    </BaseView>
  );
};

// /components/button → /components/Button, as on the site. Own keys only: /components/constructor
// is not a component.
const componentNameMap = new Map(Object.keys(SiteContent).map((key) => [key.toLowerCase(), key]));

// A component's content, loaded the first time its page opens (again after a failed load). Once
// loaded it is read synchronously, so opening the page again does not suspend.
const loadedContent = new Map<string, ComponentContent>();
const loadingContent = new Map<string, Promise<ComponentContent>>();
function loadComponentContent(name: string) {
  let content = loadingContent.get(name);
  if (!content) {
    content = SiteContent[name]().then(
      (module) => {
        loadedContent.set(name, module.default);
        return module.default;
      },
      (error: unknown) => {
        loadingContent.delete(name);
        throw error;
      },
    );
    loadingContent.set(name, content);
  }
  return content;
}

// Keyed by component: another component's page starts with a fresh preview and editor, on the
// example its URL asks for, so the editor opens with that example's code in it.
const LoadedComponentPage = ({ name }: { name: string }) => {
  const { tab = "" } = useParams();
  const { isLegacy } = useSiteSearch();
  const tabFromUrl = tab.toLowerCase().trim();
  const opensOnUsage = tabFromUrl === "web" || tabFromUrl === "mobile";
  if (opensOnUsage) void loadUsage();
  const content = loadedContent.get(name) ?? use(loadComponentContent(name));
  if (opensOnUsage && !usageModule) use(loadUsage());
  const [initial] = useState(() => {
    const defaultType = getDefaultComponentType(content);
    const { resolvedType } = getTabAndTypeFromUrl({
      tabFromUrl,
      availablePlatforms: getAvailablePlatformTypes(content),
      availableTypes: getAvailableComponentTypes(content),
      defaultType,
      isLegacy,
    });
    const type = resolvedType ?? defaultType;
    return { type, code: getComponentElement(content, type) ?? "" };
  });
  return (
    <AtlantisPreviewProvider initialType={initial.type} initialCode={initial.code}>
      <ComponentView PageMeta={content} />
    </AtlantisPreviewProvider>
  );
};

export const ComponentPage = () => {
  const { name = "", tab } = useParams();
  const { search, hash } = useLocation();
  const canonical = Object.hasOwn(SiteContent, name) ? name : componentNameMap.get(name.toLowerCase());
  if (!canonical) return <NotFoundPage />;
  if (canonical !== name) return <Navigate to={`/components/${canonical}${tab ? `/${tab}` : ""}${search}${hash}`} replace />;
  return (
    <Suspense fallback={<PageShell />}>
      <LoadedComponentPage name={canonical} key={canonical} />
    </Suspense>
  );
};
