import { Content } from "@jobber/components/Content";
import { type ReactNode, Suspense, createElement } from "react";
import { useLocation, useParams } from "react-router-dom";
import { contentMap } from "../content/pages/maps";
import type { LoadMDX, TocEntry } from "../content/types";
import { AnchorLinks } from "../layout/AnchorLinks";
import { BaseView } from "../layout/BaseView";
import { scrollToHash } from "../site/scrollToHash";
import { usePageTitle } from "../site/usePageTitle";
import { DocumentReady, useDocument } from "./documents";
import { NotFoundPage } from "./NotFoundPage";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      // The site's wrapper around a document: its global styles apply inside it (tables, code...).
      "custom-elements": { children?: ReactNode };
    }
  }
}

export const ContentView = ({
  title,
  content,
  noMaxWidth = false,
  toc,
}: {
  title: string;
  content: LoadMDX;
  noMaxWidth?: boolean;
  toc?: readonly TocEntry[];
}) => {
  usePageTitle(title);
  const Document = useDocument(content);
  return (
    <BaseView>
      <BaseView.Main noMaxWidth={noMaxWidth}>
        <custom-elements>
          <Content>
            <Suspense fallback={null}>
              {Document && createElement(Document)}
              <DocumentReady onReady={scrollToHash} />
            </Suspense>
          </Content>
        </custom-elements>
      </BaseView.Main>
      <BaseView.Siderail>
        <AnchorLinks header="Jump To" toc={toc} />
      </BaseView.Siderail>
    </BaseView>
  );
};

// /design/colors, /guides/welcome-guide...: the section's document of that name.
export const ContentLoader = () => {
  const { name } = useParams();
  const { pathname } = useLocation();
  const section = pathname.split("/")[1];
  // Own keys only: /design/constructor is not a page.
  const pages = Object.hasOwn(contentMap, section) ? contentMap[section] : undefined;
  const page = name && pages && Object.hasOwn(pages, name) ? pages[name] : undefined;
  if (!page) return <NotFoundPage />;
  return <ContentView key={pathname} title={page.title} content={page.content} noMaxWidth={page.noMaxWidth} toc={page.toc} />;
};

const loadWelcomeGuide = () => import("../content/pages/guides/welcome-guide.mdx");

export const WelcomeGuidePage = () => <ContentView title="Welcome Guide" content={loadWelcomeGuide} key="welcome-guide" />;
