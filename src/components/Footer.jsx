import React from "react";
import styles from "../App.module.css";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className={styles.container}>
          <p>&copy; 2024 FoodLovers. All rights reserved.</p>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
