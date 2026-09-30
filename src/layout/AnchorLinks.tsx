import { Box } from "@jobber/components/Box";
import { Content } from "@jobber/components/Content";
import { Typography } from "@jobber/components/Typography";
import { Link, useLocation } from "react-router-dom";
import type { TocEntry } from "../content/types";

// The side rail's links to a page's sections. On a component page they lead to its Design tab.
export function AnchorLinks({ header, toc }: { header: string; toc?: readonly TocEntry[] }) {
  const { pathname } = useLocation();
  const path = pathname.replace(/^(\/components\/[^/]+)\/[^/]+$/, "$1");
  if (!toc || toc.length === 0) return null;
  return (
    <Content>
      <Typography element="h3" size="small" textCase="uppercase" textColor="textSecondary" fontWeight="bold">
        {header}
      </Typography>
      <Content spacing="small">
        {toc.map((link, index) => (
          <Box key={link.id ?? index}>
            <Link to={{ pathname: path, hash: link.id }}>{link.label}</Link>
          </Box>
        ))}
      </Content>
    </Content>
  );
}
