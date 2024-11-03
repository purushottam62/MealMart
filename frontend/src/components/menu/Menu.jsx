import React from "react";
import styles from "./Menu.module.css";
import Header from "../Header";
import { useContext } from "react";
import { StoreContext } from "../store";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const { handleBuy } = useContext(StoreContext);
  const navigate = useNavigate();
  const menuItems = [
    { name: "Delicious Pasta", price: "1299", src: "images/pastas.avif" },
    {
      name: "Mouthwatering Burger",
      price: "999",
      src: "images/burgers.avif",
    },
    { name: "Savory Sushi", price: "1599", src: "images/sushi.avif" },
    { name: "Tasty Tacos", price: "899", src: "images/tacos.avif" },
    { name: "Refreshing Salad", price: "799", src: "images/salad.avif" },
    { name: "Decadent Cake", price: "599", src: "images/cake.avif" },
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
              <div className={styles.itemImage}>
                <img className={styles.offerImage} src={item.src}></img>
              </div>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemPrice}>₹{item.price}</p>
              <p
                className={styles.itemPrice}
                onClick={() => {
                  handleBuy(navigate, item.name, item.price, item.src);
                }}
              >
                Buy Now
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Menu;
