import { NavLink } from "react-router-dom";
import { FILTER_PICKER_PATH } from "../pages/FilterPickerPage";
import styles from "./NavMenu.module.css";

// The site's side navigation, reduced to the one component documented here.
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
            <li>
              <NavLink
                to={FILTER_PICKER_PATH}
                className={({ isActive }) =>
                  [styles.navMenuItem, styles.navMenuSubItem, styles.navMenuLink, isActive ? styles.selected : ""].join(
                    " ",
                  )
                }
              >
                FilterPicker
              </NavLink>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
);
