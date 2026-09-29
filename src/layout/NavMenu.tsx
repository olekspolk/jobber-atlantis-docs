import { NavLink } from "react-router-dom";
import { COMPONENTS } from "../content/registry";
import styles from "./NavMenu.module.css";

// The site's side navigation, reduced to the components documented here.
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
        <li>
          <div className={`${styles.navMenuItem} ${styles.navMenuSubTitle}`}>Components</div>
          <ul>
            {COMPONENTS.map((component) => (
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
      </ul>
    </nav>
  </div>
);
