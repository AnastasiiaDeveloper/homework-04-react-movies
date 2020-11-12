import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Navigation.module.css";
const Navigation = () => (
  <>
    <ul className={styles.nav}>
      <li>
        <NavLink
          to="/"
          exact
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/movie"
          className={styles.link}
          activeClassName={styles.linkActive}
        >
          Movies
        </NavLink>
      </li>
    </ul>
  </>
);

export default Navigation;