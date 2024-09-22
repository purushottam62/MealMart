import React from "react";
import styles from "./Menu.module.css";
import Header from "../Header";

const Menu = () => {
  const menuItems = [
    { name: "Delicious Pasta", price: "$12.99" },
    { name: "Mouthwatering Burger", price: "$9.99" },
    { name: "Savory Sushi", price: "$15.99" },
    { name: "Tasty Tacos", price: "$8.99" },
    { name: "Refreshing Salad", price: "$7.99" },
    { name: "Decadent Cake", price: "$5.99" },
  ];

  return (
    <>
      <Header></Header>
      <div className={styles.menuContainer}>
        <h1 className={styles.title}>Our Menu</h1>
        <p className={styles.subTitle}>Indulge in our delicious offerings!</p>
        <div className={styles.menuGrid}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menuItem}>
              <div className={styles.itemImage}></div>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemPrice}>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
