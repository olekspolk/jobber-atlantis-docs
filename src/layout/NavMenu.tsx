import { NavLink } from "react-router-dom";
import { COMPONENT_GROUPS } from "../content/registry";
import styles from "./NavMenu.module.css";

export const Logo = () => (
  <span className={styles.logo}>
    <span className={styles.logoMark} aria-hidden />
    JOBBER
  </span>
);

// The site's side navigation, reduced to its components, grouped as the site groups them. On small
// screens it opens in the NavDrawer instead, which has a logo of its own.
export const NavMenu = ({ onNavigate }: { onNavigate?: () => void }) => (
  <div className={styles.navMenuContainer}>
    <div className={styles.navMenuHeader}>
      <Logo />
    </div>
    <nav className={styles.navMenu} aria-label="Main">
      <ul>
        {COMPONENT_GROUPS.map(({ category, components }) => (
          <li key={category}>
            <div className={`${styles.navMenuItem} ${styles.navMenuSubTitle}`}>{category}</div>
            <ul>
              {components.map((component) => (
                <li key={component.name}>
                  <NavLink
                    to={component.path}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      [styles.navMenuItem, styles.navMenuSubItem, styles.navMenuLink, isActive ? styles.selected : ""].join(
                        " ",
                      )
                    }
                  >
                    {component.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  </div>
);

// The side navigation as a column next to the page, from the site's medium breakpoint up.
export const DesktopNav = () => (
  <div className={styles.desktopNavContainer}>
    <NavMenu />
  </div>
);
