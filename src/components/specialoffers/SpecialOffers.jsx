import React from "react";
import styles from "./SpecialOffers.module.css";
import Header from "../Header";

const SpecialOffers = () => {
  const offers = [
    { name: "Buy 1 Get 1 Free Pizza", price: "₹499", imageUrl: "" },
    { name: "20% Off on All Burgers", price: "₹399", imageUrl: "" },
    { name: "Combo Meal: Burger + Fries + Drink", price: "₹299", imageUrl: "" },
    { name: "Free Dessert with Any Main Course", price: "Free", imageUrl: "" },
    { name: "Family Pack: 4 Pizzas for ₹1499", price: "₹1499", imageUrl: "" },
  ];

  return (
    <>
      <Header></Header>
      <div className={styles.offersContainer}>
        <h1 className={styles.title}>Special Offers</h1>
        <p className={styles.subTitle}>Unbeatable deals just for you!</p>
        <div className={styles.offersGrid}>
          {offers.map((offer, index) => (
            <div key={index} className={styles.offerCard}>
              <div
                className={styles.offerImage}
                style={{ backgroundImage: `url(${offer.imageUrl})` }}
              ></div>
              <h2 className={styles.offerName}>{offer.name}</h2>
              <p className={styles.offerPrice}>{offer.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpecialOffers;
