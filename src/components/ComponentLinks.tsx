import { Box } from "@jobber/components/Box";
import { Cluster } from "@jobber/components/Cluster";
import { Content } from "@jobber/components/Content";
import { Icon } from "@jobber/components/Icon";
import { Link } from "@jobber/components/Link";
import { Typography } from "@jobber/components/Typography";
import type { TocEntry } from "../content/parseDocs";

const SectionTitle = ({ children }: { children: string }) => (
  <Typography element="h3" size="small" textCase="uppercase" textColor="textSecondary" fontWeight="bold">
    {children}
  </Typography>
);

export const ComponentLinks = ({
  toc,
  links,
  goToUsage,
  goToProps,
}: {
  toc: readonly TocEntry[];
  links: readonly { label: string; url: string }[];
  goToUsage: () => void;
  goToProps: () => void;
}) => (
  <Content spacing="larger">
    <Content>
      <SectionTitle>Design</SectionTitle>
      <Content spacing="small">
        {toc.map((entry) => (
          <Box key={entry.id}>
            <a className="siderail-link" href={`#${entry.id}`}>
              {entry.label}
            </a>
          </Box>
        ))}
      </Content>
    </Content>
    <Content>
      <SectionTitle>Web</SectionTitle>
      <Content spacing="small">
        <Box>
          <a
            className="siderail-link"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToUsage();
            }}
          >
            Usage
          </a>
        </Box>
        <Box>
          <a
            className="siderail-link"
            href="#"
            onClick={(event) => {
              event.preventDefault();
              goToProps();
            }}
          >
            Props
          </a>
        </Box>
      </Content>
    </Content>
    <Content>
      <SectionTitle>Links</SectionTitle>
      <Content spacing="small">
        {links.map((link) => (
          <Cluster gap="small" key={link.url}>
            <Icon size="small" color="interactive" name="link" />
            <Link url={link.url} external>
              {link.label}
            </Link>
          </Cluster>
        ))}
      </Content>
    </Content>
  </Content>
);
