import { Box } from "@jobber/components/Box";
import { Content } from "@jobber/components/Content";
import { Heading } from "@jobber/components/Heading";
import { InputText } from "@jobber/components/InputText";
import { Modal } from "@jobber/components/Modal";
import { Typography } from "@jobber/components/Typography";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  type ContentListItem,
  changelogList,
  componentList,
  contentList,
  designList,
  guidesList,
  hooksList,
  packagesList,
  patternsList,
} from "../site/lists";
import { ContentCard, ContentCardWrapper } from "./PageBlock";
import styles from "./SearchBox.module.css";
import { ToolBoxIllustration } from "./ToolBoxIllustration";

const lists = [
  { title: "Components", items: componentList },
  { title: "Content", items: contentList },
  { title: "Design", items: designList },
  { title: "Patterns", items: patternsList },
  { title: "Changelog", items: changelogList },
  { title: "Guides", items: guidesList },
  { title: "Hooks", items: hooksList },
  { title: "Packages", items: packagesList },
];

const SearchBoxSection = ({
  sectionTitle,
  filteredListItems,
  handleCloseModal,
}: {
  sectionTitle: string;
  filteredListItems: readonly ContentListItem[];
  handleCloseModal: () => void;
}) => (
  <Content>
    <Typography size="base" fontWeight="bold" textCase="uppercase" textColor="textSecondary" element="h3">
      {sectionTitle}
    </Typography>
    <ContentCardWrapper>
      {filteredListItems.map(({ title, to, imageURL }, key) => (
        <ContentCard onClick={handleCloseModal} title={title} to={to} imageURL={imageURL} key={key} />
      ))}
    </ContentCardWrapper>
  </Content>
);

const EmptyResults = () => (
  <Box height="100%" direction="column" padding="extravagant" gap="larger" alignItems="center">
    <ToolBoxIllustration />
    <Heading level={1} element="h3">
      The toolbox looks empty!
    </Heading>
    <Typography align="center" fontWeight="semiBold" size="large" textColor="text">
      We couldn't match any results with your search; try a different term.
    </Typography>
    <Typography align="center" fontWeight="medium" size="large" textColor="textSecondary">
      If you think something's missing, let the Atlantis team know.
    </Typography>
  </Box>
);

// Every page of the site by title (and a few other words for components): the search button's dialog.
export const SearchBox = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [search, setSearch] = useState("");

  const filteredLists = useMemo(() => {
    const term = search.toLowerCase();
    return lists.map((list) => ({
      title: list.title,
      items: list.items.filter(
        (item) =>
          item.title.toLowerCase().includes(term) ||
          item.additionalMatches?.some((match) => match.toLowerCase().includes(term)),
      ),
    }));
  }, [search]);
  const emptyResults = filteredLists.every((list) => list.items.length === 0);

  useEffect(() => {
    if (open) ref.current?.focus();
  }, [open]);

  const closeModal = () => {
    setOpen(false);
    setSearch("");
  };

  return (
    <Modal size="large" open={open} onRequestClose={closeModal} title="Search">
      <Content spacing="large">
        <InputText
          ref={ref}
          value={search}
          placeholder="Search"
          prefix={{ icon: "search" }}
          clearable="always"
          onChange={(value: string) => setSearch(value)}
        />
        <div className={styles.searchBoxResults}>
          <Content spacing="larger">
            {filteredLists.map(
              (list) =>
                list.items.length > 0 && (
                  <Content key={list.title}>
                    <SearchBoxSection sectionTitle={list.title} filteredListItems={list.items} handleCloseModal={closeModal} />
                  </Content>
                ),
            )}
            {emptyResults && <EmptyResults />}
          </Content>
        </div>
      </Content>
    </Modal>
  );
};
