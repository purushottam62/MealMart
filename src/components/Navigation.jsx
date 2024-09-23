import React from "react";
import styles from "../App.module.css";
import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const Navigation = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <ul className={styles.navLeft}>
          <li>
            <NavLink to="/" className={styles.navItem}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu" className={styles.navItem}>
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/deals" className={styles.navItem}>
              Deals
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={styles.navItem}>
              Contact
            </NavLink>
          </li>
        </ul>
        <ul className={styles.navRight}>
          <li>
            <NavLink to="/cart" className={styles.navItem}>
              <FaShoppingCart />
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile" className={styles.navItem}>
              <FaRegUserCircle />
            </NavLink>
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
