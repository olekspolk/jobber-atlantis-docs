import { useLocation } from "react-router-dom";
import { BaseView, PageWrapper } from "./BaseView";
import { TopNav } from "./TopNav";

const OVERVIEW_PAGES = new Set(["/", "/components", "/patterns", "/content", "/design", "/hooks", "/guides", "/packages"]);

// A page on its first visit, while its code loads: its top bar over an empty page, laid out as the
// page will be (an overview, the changelog's full width, or a column beside the side rail).
export function PageShell() {
  const { pathname } = useLocation();
  if (OVERVIEW_PAGES.has(pathname)) {
    return (
      <PageWrapper>
        <TopNav />
      </PageWrapper>
    );
  }
  const changelog = pathname === "/changelog";
  return (
    <BaseView>
      <BaseView.Main noMaxWidth={changelog}>{null}</BaseView.Main>
      {!changelog && <BaseView.Siderail>{null}</BaseView.Siderail>}
    </BaseView>
  );
}
