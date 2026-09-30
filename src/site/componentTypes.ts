// The kinds of example a component page can show, as the site models them: the web component (its
// "legacy" version when a supported rewrite exists), the supported web rewrite, and the mobile one.
import type { ComponentContent, ComponentLink, LoadMDX, PropsEntry } from "../content/types";

export type ComponentKind = "web" | "webSupported" | "mobile";
export type Platform = "web" | "mobile";

interface ComponentKindConfig {
  readonly label: string;
  readonly displayName: string;
  readonly platform: Platform;
  readonly warningMessage?: string;
}

export const COMPONENT_TYPE_CONFIGS: Record<ComponentKind, ComponentKindConfig> = {
  web: { label: "Web (Legacy)", displayName: "Web", platform: "web" },
  webSupported: { label: "Web (Supported)", displayName: "Supported", platform: "web" },
  mobile: {
    label: "Mobile",
    displayName: "Mobile",
    platform: "mobile",
    warningMessage:
      "Due to distinctions between web and native platform, this may not render accurately in a web browser.",
  },
};

const GITHUB_BLOB_BASE_URL = "https://github.com/GetJobber/atlantis/blob/master";

export const getComponentTypeConfig = (type: ComponentKind) => COMPONENT_TYPE_CONFIGS[type];
export const getPlatformForComponentType = (type: ComponentKind) => getComponentTypeConfig(type).platform;

export function getAvailableComponentTypes(content: ComponentContent): ComponentKind[] {
  const types: ComponentKind[] = [];
  if (content.component.element || content.component.web) types.push("web");
  if (content.component.webSupported) types.push("webSupported");
  if (content.component.mobileElement || content.component.mobile) types.push("mobile");
  return types;
}

export function getAvailablePlatformTypes(content: ComponentContent): Platform[] {
  return [...new Set(getAvailableComponentTypes(content).map(getPlatformForComponentType))];
}

export function getAvailableVersionsForPlatform(content: ComponentContent, platform: Platform) {
  return getAvailableComponentTypes(content).filter((type) => getPlatformForComponentType(type) === platform);
}

export function getDefaultComponentType(content: ComponentContent): ComponentKind {
  const types = getAvailableComponentTypes(content);
  if (types.includes("webSupported")) return "webSupported";
  if (types.includes("web")) return "web";
  if (types.includes("mobile")) return "mobile";
  return "webSupported";
}

export function getComponentElement(content: ComponentContent, type: ComponentKind) {
  switch (type) {
    case "web":
      return content.component.web || content.component.element;
    case "webSupported":
      return content.component.webSupported;
    case "mobile":
      return content.component.mobile || content.component.mobileElement;
  }
}

export function getComponentProps(content: ComponentContent, type: ComponentKind): readonly PropsEntry[] | undefined {
  switch (type) {
    case "web":
      return content.webProps || content.props;
    case "webSupported":
      return content.webSupportedProps;
    case "mobile":
      return content.mobileProps;
  }
}

export function getComponentContent(content: ComponentContent, type: ComponentKind): LoadMDX {
  switch (type) {
    case "web":
      return content.webContent || content.content;
    case "webSupported":
      return content.webSupportedContent || content.content;
    case "mobile":
      return content.mobileContent || content.content;
  }
}

export function getComponentNotes(content: ComponentContent, type: ComponentKind): LoadMDX | undefined {
  switch (type) {
    case "web":
      return content.webNotes || content.notes;
    case "webSupported":
      return content.webSupportedNotes || content.notes;
    case "mobile":
      return content.mobileNotes || content.notes;
  }
}

export function getComponentLinks(content: ComponentContent, type: ComponentKind): readonly ComponentLink[] | undefined {
  switch (type) {
    case "web":
      return content.webLinks || content.links;
    case "webSupported":
      return content.webSupportedLinks;
    case "mobile":
      return content.mobileLinks || content.links;
  }
}

// "Web GitHub" / "Mobile GitHub": the component's source file, from its props' file path.
const sourceFilePath = (content: ComponentContent, type: ComponentKind) =>
  getComponentProps(content, type)?.find((entry) => entry.filePath)?.filePath;

const normalizeGithubFilePath = (filePath: string) =>
  filePath.startsWith("../") ? `packages/${filePath.slice(3)}` : filePath.replace(/^\.\//, "");

function githubSourceType(content: ComponentContent, platform: Platform, currentType: ComponentKind) {
  if (platform === "mobile") return sourceFilePath(content, "mobile") ? "mobile" : undefined;
  const preferred: ComponentKind[] = currentType === "webSupported" ? ["webSupported", "web"] : ["web", "webSupported"];
  return preferred.find((type) => sourceFilePath(content, type));
}

export function getComponentGithubLinks(content: ComponentContent, currentType: ComponentKind): ComponentLink[] {
  return getAvailablePlatformTypes(content).flatMap((platform) => {
    const type = githubSourceType(content, platform, currentType);
    const filePath = type && sourceFilePath(content, type);
    if (!filePath) return [];
    return [
      {
        label: platform === "web" ? "Web GitHub" : "Mobile GitHub",
        type: platform,
        url: `${GITHUB_BLOB_BASE_URL}/${normalizeGithubFilePath(filePath)}`,
      },
    ];
  });
}

// The kind of example a URL asks for: /components/Button/mobile → mobile, ?isLegacy=true → web.
export function resolveComponentTypeFromRoute({
  tab,
  isLegacy,
  availableTypes,
  defaultType,
  allowNullWhenNoTab = false,
}: {
  tab?: string;
  isLegacy: boolean;
  availableTypes?: readonly ComponentKind[];
  defaultType?: ComponentKind;
  allowNullWhenNoTab?: boolean;
}): ComponentKind | null {
  const normalizedTab = tab?.toLowerCase().trim();
  const hasType = (type: ComponentKind) => !availableTypes || availableTypes.includes(type);
  const fallbackType = (): ComponentKind => {
    if (defaultType && hasType(defaultType)) {
      if (defaultType === "webSupported" && isLegacy && hasType("web")) return "web";
      return defaultType;
    }
    if (isLegacy && hasType("web")) return "web";
    if (hasType("webSupported")) return "webSupported";
    if (hasType("web")) return "web";
    if (hasType("mobile")) return "mobile";
    return "webSupported";
  };
  if (!normalizedTab) return allowNullWhenNoTab ? null : fallbackType();
  if (normalizedTab === "implement") return defaultType ? fallbackType() : allowNullWhenNoTab ? null : "webSupported";
  if (normalizedTab === "mobile") return hasType("mobile") ? "mobile" : fallbackType();
  if (normalizedTab === "web") {
    if (isLegacy && hasType("web")) return "web";
    if (hasType("webSupported")) return "webSupported";
    if (hasType("web")) return "web";
    return fallbackType();
  }
  return allowNullWhenNoTab ? null : fallbackType();
}
