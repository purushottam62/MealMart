import React from "react";
import Navigation from "./Navigation";
import styles from "../App.module.css";
import { NavLink } from "react-router-dom";
const Header = () => {
  return (
    <div>
      {" "}
      <header className={styles.navbar}>
        <div className={styles.container}>
          <h1 className={styles.logo}>MealMart</h1>
          <Navigation></Navigation>
          <NavLink to="/menu" className={styles.cta}>
            Order Now
          </NavLink>
        </div>
      </header>
    </div>
  );
};

export default Header;
