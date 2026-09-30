import { Box } from "@jobber/components/Box";
import { Cluster } from "@jobber/components/Cluster";
import { Content } from "@jobber/components/Content";
import { Icon } from "@jobber/components/Icon";
import { Link } from "@jobber/components/Link";
import { Typography } from "@jobber/components/Typography";
import type { ComponentLink, TocEntry } from "../content/types";
import { AnchorLinks } from "../layout/AnchorLinks";
import { useAtlantisSite } from "../site/AtlantisSiteContext";
import { type ComponentKind, type Platform, getComponentTypeConfig } from "../site/componentTypes";

const heading = (text: string) => (
  <Typography element="h3" size="small" textCase="uppercase" textColor="textSecondary" fontWeight="bold">
    {text}
  </Typography>
);

// A component page's side rail: its Design sections, each platform's usage and props, its links.
export const ComponentLinks = ({
  links,
  toc,
  goToProps,
  goToUsage,
  availablePlatforms,
}: {
  links?: readonly ComponentLink[];
  toc?: readonly TocEntry[];
  goToProps: (type: ComponentKind) => void;
  goToUsage: (type: ComponentKind) => void;
  availablePlatforms: readonly Platform[];
}) => {
  const { isMinimal } = useAtlantisSite();
  if (isMinimal) return null;
  return (
    <Content spacing="larger">
      <AnchorLinks header="Design" toc={toc} />
      {availablePlatforms.map((platform) => {
        const config = getComponentTypeConfig(platform === "web" ? "web" : "mobile");
        return (
          <Content key={platform}>
            {heading(config.displayName)}
            <Content spacing="small">
              <Box>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    goToUsage(config.platform);
                  }}
                >
                  Usage
                </a>
              </Box>
              <Box>
                <a
                  href="#"
                  onClick={(event) => {
                    event.preventDefault();
                    goToProps(config.platform);
                  }}
                >
                  Props
                </a>
              </Box>
            </Content>
          </Content>
        );
      })}
      <Content>
        {heading("Links")}
        <Content spacing="small">
          {links?.map((link, index) => (
            <Cluster gap="small" key={link.url}>
              <Icon size="small" color="interactive" name="link" />
              <Link url={link.url} external key={index}>
                {link.label}
              </Link>
            </Cluster>
          ))}
        </Content>
      </Content>
    </Content>
  );
};
