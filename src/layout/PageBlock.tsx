// The site's overview pages (Home, Components, Design...): a header block over sections of cards.
import { AtlantisThemeContextProvider, useAtlantisTheme } from "@jobber/components/AtlantisThemeContext";
import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Card } from "@jobber/components/Card";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { SegmentedControl } from "@jobber/components/SegmentedControl";
import { Text } from "@jobber/components/Text";
import { type ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ContentListItem } from "../site/lists";
import { usePageReady } from "../site/pageReady";
import { usePageTitle } from "../site/usePageTitle";
import { PageWrapper } from "./BaseView";
import { TopNav } from "./TopNav";

const ComponentWrapper = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      width: "100%",
      padding: "var(--space-large)",
      height: "calc(100% - 57px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxSizing: "border-box",
      borderBottom: "1px solid var(--color-border)",
    }}
  >
    {children}
  </div>
);

interface ContentCardProps extends Partial<ContentListItem> {
  readonly title: string;
  readonly to: string;
  readonly component?: () => ReactNode;
  readonly onClick?: () => void;
}

// A page's card: its illustration (always in the light theme, blended into the card) and its title.
export const ContentCard = ({ title, to, component, imageURL, onClick }: ContentCardProps) => {
  const navigate = useNavigate();
  const { theme } = useAtlantisTheme();
  return (
    <Card
      elevation={theme === "dark" ? "none" : "low"}
      onClick={() => {
        navigate(to);
        onClick?.();
      }}
      UNSAFE_style={{ container: { boxShadow: "none", border: "1px solid var(--color-border)" } }}
    >
      {!component ? (
        <AtlantisThemeContextProvider dangerouslyOverrideTheme="light">
          {imageURL && (
            <div
              style={
                theme === "dark"
                  ? { background: "var(--color-base-blue--200)", borderRadius: "var(--radius-base) var(--radius-base) 0 0" }
                  : {}
              }
            >
              <img style={{ width: "100%", mixBlendMode: "multiply", border: "none" }} src={imageURL} alt="" />
            </div>
          )}
        </AtlantisThemeContextProvider>
      ) : (
        <ComponentWrapper>{component()}</ComponentWrapper>
      )}
      <div style={{ padding: "var(--space-base)" }}>
        <Content>
          <Heading level={4} element="h3">
            {title}
          </Heading>
        </Content>
      </div>
    </Card>
  );
};

export const ContentCardWrapper = ({ children }: { children: ReactNode }) => (
  <div className="contentCardWrapper" data-elevation="elevated">
    {children}
  </div>
);

interface HeaderProps {
  readonly title: string;
  readonly body: string;
  readonly ctaLabel?: string;
  readonly to?: string;
  readonly imageURL?: string;
}

const HeaderBlock = ({ title, body, ctaLabel, to }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <Box background="surface--background--subtle">
      <header className="headerBlock">
        <Content spacing="large">
          <div>
            <Content spacing="large">
              <Heading level={1}>{title}</Heading>
              <Text size="large">{body}</Text>
            </Content>
          </div>
          {to && ctaLabel && <Button type="primary" size="large" label={ctaLabel} onClick={() => navigate(to)} />}
        </Content>
      </header>
    </Box>
  );
};

const BodyBlock = ({ children }: { children: ReactNode }) => (
  <div style={{ maxWidth: 1024, margin: "auto", padding: "var(--space-largest) var(--space-large)" }}>
    <Content spacing="extravagant">{children}</Content>
  </div>
);

const CategoryCardSection = ({ category, children }: { category: string; children: ReactNode }) => (
  <Content spacing="large">
    <div
      className="stickySectionHeader"
      style={{
        background: "var(--color-surface)",
        padding: "var(--space-base) var(--space-minuscule) var(--space-smaller) 0px",
        marginLeft: "-1px",
        width: "100%",
      }}
    >
      <Heading level={2}>{category}</Heading>
    </div>
    <ContentCardWrapper>{children}</ContentCardWrapper>
  </Content>
);

export interface PageBlockStructure {
  readonly header: HeaderProps;
  readonly body: { readonly content: readonly ContentCardProps[] };
  /** Group the cards by their sections (a component can be in several). */
  readonly useCategories?: boolean;
  /** Let the reader switch between the categories and an A–Z list. */
  readonly showSegmentedControl?: boolean;
}

export const PageBlock = ({ structure }: { structure: PageBlockStructure }) => {
  usePageTitle(structure.header.title);
  usePageReady();
  const [cardView, setCardView] = useState(structure.useCategories ? "category" : "a-z");

  const sectionedComponents = () => {
    const sectionMap: Record<string, ContentCardProps[]> = {};
    for (const item of structure.body.content) {
      item.sections?.forEach((section) => {
        (sectionMap[section] ??= []).push(item);
      });
    }
    return Object.entries(sectionMap).map(([section, items]) => ({ section, items }));
  };

  return (
    <PageWrapper>
      <TopNav />
      <main
        style={{
          boxShadow: "var(--shadow-base)",
          borderRadius: "var(--radius-base) var(--radius-base) 0 0",
          overflow: "hidden",
          position: "relative",
          flexGrow: 1,
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div style={{ overflowY: "scroll", height: "100%", outline: "transparent" }} tabIndex={-1} data-main-scroll>
          <HeaderBlock {...structure.header} />
          <BodyBlock>
            {structure.showSegmentedControl && (
              <div style={{ width: "240px", margin: "auto", paddingBottom: "var(--space-largest)" }}>
                <SegmentedControl selectedValue={cardView} onSelectValue={setCardView}>
                  <SegmentedControl.Option value="category">Categorical</SegmentedControl.Option>
                  <SegmentedControl.Option value="a-z">Alphabetical</SegmentedControl.Option>
                </SegmentedControl>
              </div>
            )}
            {structure.useCategories && cardView === "category" ? (
              sectionedComponents().map(({ section, items }) => (
                <CategoryCardSection category={section} key={section}>
                  {items.map((item, index) => (
                    <ContentCard {...item} key={index} />
                  ))}
                </CategoryCardSection>
              ))
            ) : (
              <ContentCardWrapper>
                {structure.body.content.map((item, index) => (
                  <ContentCard {...item} key={index} />
                ))}
              </ContentCardWrapper>
            )}
          </BodyBlock>
        </div>
      </main>
    </PageWrapper>
  );
};
