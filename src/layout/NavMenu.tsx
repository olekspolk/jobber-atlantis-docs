import { NavLink } from "react-router-dom";
import { COMPONENT_GROUPS } from "../content/registry";
import styles from "./NavMenu.module.css";

// The site's side navigation, reduced to its components, grouped as the site groups them.
export const NavMenu = () => (
  <div className={styles.navMenuContainer}>
    <div className={styles.navMenuHeader}>
      <span className={styles.logo}>
        <span className={styles.logoMark} aria-hidden />
        JOBBER
      </span>
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
