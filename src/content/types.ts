import type { MDXContent } from "mdx/types";

// A document of the site (MDX, or plain markdown for the changelogs), loaded when first shown.
export type LoadMDX = () => Promise<{ default: MDXContent }>;

export interface TocEntry {
  readonly id: string;
  readonly label: string;
}

// A content page (/design/colors): its document and what its side rail links to.
export interface ContentPage {
  readonly title: string;
  readonly intro?: string;
  readonly noMaxWidth?: boolean;
  readonly toc?: readonly TocEntry[];
  readonly content: LoadMDX;
}

interface PropDoc {
  readonly description?: string;
  readonly required?: boolean;
  readonly type?: { readonly name?: string };
}

// react-docgen's output for a component, reduced to what the props list shows.
export interface PropsEntry {
  readonly displayName: string;
  readonly filePath?: string;
  readonly props: Record<string, PropDoc | undefined>;
}

export interface ComponentLink {
  readonly label: string;
  readonly type?: string;
  readonly url: string;
}

// A component page (/components/Button), as the site describes it: the Design tab's document, the
// code each platform's preview runs, props per platform, the Implement tab's notes and links.
export interface ComponentContent {
  readonly title: string;
  readonly description?: string;
  readonly content: LoadMDX;
  readonly webContent?: LoadMDX;
  readonly webSupportedContent?: LoadMDX;
  readonly mobileContent?: LoadMDX;
  readonly notes?: LoadMDX;
  readonly webNotes?: LoadMDX;
  readonly webSupportedNotes?: LoadMDX;
  readonly mobileNotes?: LoadMDX;
  readonly toc?: readonly TocEntry[];
  readonly props?: readonly PropsEntry[];
  readonly webProps?: readonly PropsEntry[];
  readonly webSupportedProps?: readonly PropsEntry[];
  readonly mobileProps?: readonly PropsEntry[];
  readonly component: {
    readonly element?: string;
    readonly web?: string;
    readonly webSupported?: string;
    readonly mobileElement?: string;
    readonly mobile?: string;
    readonly defaultProps?: Record<string, unknown>;
  };
  readonly links: readonly ComponentLink[];
  readonly webLinks?: readonly ComponentLink[];
  readonly webSupportedLinks?: readonly ComponentLink[];
  readonly mobileLinks?: readonly ComponentLink[];
  /** Largest height of the preview frame, in px (the replica's own addition). */
  readonly previewMaxHeight?: number;
}
