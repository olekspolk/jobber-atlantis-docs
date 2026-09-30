import { Box } from "@jobber/components/Box";
import { Button } from "@jobber/components/Button";
import { Link as AtlantisLink } from "@jobber/components/Link";
import { Typography } from "@jobber/components/Typography";
import {
  Children,
  Fragment,
  type ReactElement,
  type ReactNode,
  type RefObject,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import { useAtlantisSite } from "../site/AtlantisSiteContext";
import { type NavRoute, routes } from "../site/navRoutes";
import { getStorybookUrl } from "../site/storybook";
import { JobberLogo } from "./JobberLogo";
import { LeftDrawer } from "./LeftDrawer";
import styles from "./NavMenu.module.css";
import { VisibleWhenFocused } from "./VisibleWhenFocused";

const linkClassName = (base: string, isSelected: boolean) => `${base} ${isSelected ? styles.selected : ""}`.trim();

interface NavLinkProps {
  readonly to?: string;
  readonly children: ReactNode;
  readonly selectedRef: RefObject<HTMLAnchorElement | null>;
}

// Following a link closes the small-screen drawer (a no-op beside the page, from 768px up).
function NavItemLink({ to, children, selectedRef, className }: NavLinkProps & { className: string }) {
  const { pathname } = useLocation();
  const isSelected = pathname === to;
  const { closeMobileMenu } = useAtlantisSite();
  return (
    <Link
      to={to ?? "/"}
      className={linkClassName(className, isSelected)}
      ref={isSelected ? selectedRef : null}
      onClick={closeMobileMenu}
    >
      {children}
    </Link>
  );
}

const StyledLink = (props: NavLinkProps) => (
  <NavItemLink {...props} className={`${styles.navMenuItem} ${styles.navMenuLink}`} />
);

const StyledSubLink = (props: NavLinkProps) => (
  <NavItemLink {...props} className={`${styles.navMenuItem} ${styles.navMenuSubItem} ${styles.navMenuLink}`} />
);

const MenuList = ({ children }: { children: ReactNode }) => <ul style={{ listStyle: "none", padding: 0 }}>{children}</ul>;

const MenuItem = ({ children }: { children: ReactNode }) => (
  <li style={{ listStyle: "none" }} className="stickySectionHeader">
    <Typography fontWeight="semiBold" size="large" textColor="heading">
      {children}
    </Typography>
  </li>
);

const MenuSubItem = ({ children }: { children: ReactNode; selected?: boolean }) => (
  <li style={{ listStyle: "none" }}>
    <Typography textColor="heading">{children}</Typography>
  </li>
);

const sectionTitle = (section: string) => (
  <div className={`${styles.navMenuItem} ${styles.navMenuSubTitle}`}>
    <Typography fontWeight="bold" size="small" textColor="textSecondary">
      {section.toUpperCase()}
    </Typography>
  </div>
);

// A section (Patterns, Components...): its title links to its overview page, the button beside it
// shows or hides its pages. It opens by itself when it holds the current page.
function NavMenuDisclosure({ children, title, to, selected }: { children: ReactNode; title: string; to?: string; selected: boolean }) {
  const { pathname } = useLocation();
  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const { closeMobileMenu } = useAtlantisSite();
  const hasSelectedChild = childrenArray.some(
    (child) => isValidElement<{ to?: string }>(child) && pathname === child.props.to,
  );
  const [isOpen, setIsOpen] = useState(selected || hasSelectedChild);

  useEffect(() => {
    if (selected || hasSelectedChild) setIsOpen(true);
  }, [selected, hasSelectedChild]);

  useEffect(() => {
    if (!isOpen) return;
    document.querySelector(`[href="${pathname}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [isOpen, pathname]);

  const isTitleSelected = pathname === to;
  return (
    <div>
      <span className={`${styles.disclosureNavItem} ${isTitleSelected ? styles.selected : ""} stickySectionHeader`}>
        <Link to={to ?? "/"} tabIndex={0} onClick={closeMobileMenu}>
          <Typography fontWeight="semiBold" size="large" textColor="heading">
            {title}
          </Typography>
        </Link>
        <Button
          variation="subtle"
          size="small"
          type="tertiary"
          onClick={(event) => {
            event.preventDefault();
            setIsOpen(!isOpen);
          }}
          ariaLabel={`Toggle ${title}`}
          icon={isOpen ? "arrowUp" : "arrowDown"}
        />
      </span>
      {isOpen && (
        <ul style={{ padding: "0" }}>
          {childrenArray
            .filter((child) => isValidElement(child))
            .map((child) =>
              (child as ReactElement).type === Fragment
                ? child
                : cloneElement(child as ReactElement<{ to?: string; selected?: boolean }>, {
                    selected: pathname === (child as ReactElement<{ to?: string }>).props.to,
                  }),
            )}
        </ul>
      )}
    </div>
  );
}

// The site's side navigation. From the medium breakpoint up it sits beside the page; below it, the
// menu button opens it in a drawer over the page.
export const NavMenu = ({ mainContentRef }: { mainContentRef: RefObject<HTMLDivElement | null> }) => {
  const { isMinimal, isMobileMenuOpen, closeMobileMenu } = useAtlantisSite();
  const { pathname } = useLocation();
  const selectedRef = useRef<HTMLAnchorElement>(null);
  if (isMinimal) return null;

  const subSubMenu = (items: readonly NavRoute[], routeIndex: number) =>
    items.map((item, index) => (
      <MenuSubItem key={`${routeIndex}-${index}`}>
        <StyledSubLink to={item.path} selectedRef={selectedRef}>
          {item.handle}
        </StyledSubLink>
      </MenuSubItem>
    ));

  const subMenu = (items: readonly NavRoute[], routeIndex: number) =>
    items.map((item, index) => {
      if (item.children) {
        return (
          <Fragment key={`${routeIndex}-${index}`}>
            {sectionTitle(item.handle)}
            {subSubMenu(item.children, routeIndex)}
          </Fragment>
        );
      }
      return (
        <MenuSubItem key={`${routeIndex}-${index}`}>
          <StyledSubLink to={item.path ?? "/"} selectedRef={selectedRef}>
            {item.handle}
          </StyledSubLink>
        </MenuSubItem>
      );
    });

  // Focus lands on the page's own scroller when it has one, so the keyboard scrolls the content. It
  // moves once the drawer (when this is its copy of the menu) has closed and handed the focus back.
  const skipToContent = () => {
    closeMobileMenu();
    setTimeout(() => {
      const pane = mainContentRef.current;
      (pane?.querySelector<HTMLElement>("[data-main-scroll]") ?? pane)?.focus();
    });
  };

  const menuContent = (
    <nav className={styles.navMenuContainer}>
      <div className={styles.navMenuHeader}>
        <VisibleWhenFocused>
          <Button label="Skip to Content" onClick={skipToContent} />
        </VisibleWhenFocused>
        <div className={styles.navMenuHeaderLogo}>
          <Link to="/">
            <JobberLogo />
          </Link>
        </div>
      </div>
      <div className={styles.navMenu}>
        <MenuList>
          {routes.map((route, routeIndex) => {
            if (route.inNav === false) return null;
            if (route.children) {
              return (
                <Box key={routeIndex}>
                  <NavMenuDisclosure
                    to={route.path ?? "/"}
                    title={route.handle}
                    selected={pathname.startsWith(route.path ?? "/")}
                  >
                    {subMenu(route.children, routeIndex)}
                  </NavMenuDisclosure>
                </Box>
              );
            }
            return (
              <MenuItem key={routeIndex}>
                <StyledLink to={route.path ?? "/"} selectedRef={selectedRef}>
                  {route.handle}
                </StyledLink>
              </MenuItem>
            );
          })}
        </MenuList>
      </div>
      <div className={styles.navFooter}>
        <Typography size="small" textColor="interactiveSubtle">
          View in Storybook:{" "}
          <AtlantisLink url={getStorybookUrl("?path=/docs", "web")} external>
            Web
          </AtlantisLink>{" "}
          or{" "}
          <AtlantisLink url={getStorybookUrl("?path=/docs", "mobile")} external>
            Mobile
          </AtlantisLink>
        </Typography>
      </div>
    </nav>
  );

  return (
    <>
      <div className={styles.desktopNavContainer}>{menuContent}</div>
      {isMobileMenuOpen && (
        <LeftDrawer
          onClose={closeMobileMenu}
          header={
            <Box padding={{ top: "smaller" }}>
              <Link to="/" onClick={closeMobileMenu}>
                <JobberLogo />
              </Link>
            </Box>
          }
        >
          {menuContent}
        </LeftDrawer>
      )}
    </>
  );
};
