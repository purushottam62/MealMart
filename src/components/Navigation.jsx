import React from "react";
import styles from "../App.module.css";
import { NavLink } from "react-router-dom";
const Navigation = () => {
  return (
    <div>
      <nav>
        <ul className={styles.nav}>
          <li>
            <NavLink to="/" className={styles.navItem} href="#">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={styles.navItem} href="#">
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/deals" className={styles.navItem} href="#">
              Deals
            </NavLink>
          </li>
          <li>
            <a className={styles.navItem} href="#">
              Contact
            </a>
          </li>
          <li>
            <NavLink to="/login" className={styles.navItem}>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navigation;
