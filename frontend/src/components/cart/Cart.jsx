// Cart.jsx
import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import Navigation from "../Navigation";
import Header from "../Header";

const Cart = () => {
  const token = localStorage.getItem("access");
  if (!token) {
    <p>Please login first to see your cart </p>;
    redirect("/login");
  }
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("access");

      try {
        const response = await fetch("/api/v4/get_cart/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: token }),
        });

        if (response.ok) {
          const data = await response.json();
          setItems(data.items);
        } else {
          const errorData = await response.json();
          setError(errorData.error);
        }
      } catch (error) {
        setError("Something went wrong!");
      }
    };

    fetchCart();
  }, []);

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <>
      <Header></Header>
      <div className={styles.cartContainer}>
        <h1 className={styles.title}>Your Cart</h1>
        <div className={styles.itemsGrid}>
          {items.map((item) => (
            <div key={item.id} className={styles.itemCard}>
              <img
                src={item.image}
                alt={item.name}
                className={styles.itemImage}
              />
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemPrice}>₹{item.price}</p>
              <p className={styles.itemQuantity}>Quantity: {item.quantity}</p>
              <p className={styles.itemTotal}>Total: ₹{item.total_price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cart;
