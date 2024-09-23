import React from "react";
import styles from "./SpecialOffers.module.css";
import Navigation from "../Navigation";
import Header from "../Header";

const SpecialOffer = () => {
  const offers = [
    {
      id: 1,
      title: "Super Saver Combo",
      price: 299,
      description: "A delightful combo meal with a special price.",
      image: "images/offer1.avif",
    },
    {
      id: 2,
      title: "Weekend Feast",
      price: 499,
      description: "Indulge in our weekend special offers.",
      image: "images/offer1.avif",
    },
    {
      id: 3,
      title: "Family Pack",
      price: 799,
      description: "Perfect for a family meal with all the best dishes.",
      image: "images/offer1.avif",
    },
    {
      id: 4,
      title: "Biryani Bonanza",
      price: 199,
      description: "Enjoy the flavor-packed biryani at an amazing price.",
      image: "images/biryani offer.avif",
    },
  ];

  return (
    <>
      <Header></Header>
      <div className={styles.specialOfferContainer}>
        <h1 className={styles.header}>Special Offers</h1>
        <div className={styles.offersGrid}>
          {offers.map((offer) => (
            <div key={offer.id} className={styles.offerCard}>
              <div className={styles.imageContainer}>
                <img
                  src={offer.image} // Assuming images are in 'public/images' directory
                  alt={offer.title}
                  className={styles.offerImage}
                />
              </div>
              <h2 className={styles.offerTitle}>{offer.title}</h2>
              <p className={styles.offerDescription}>{offer.description}</p>
              <div className={styles.priceContainer}>
                <p className={styles.offerPrice}>₹{offer.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpecialOffer;
