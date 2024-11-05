import React from "react";
import styles from "./SpecialOffers.module.css";
import Navigation from "../Navigation";
import Header from "../Header";
import { useContext } from "react";
import { StoreContext } from "../store";
import { useNavigate } from "react-router-dom";

const SpecialOffer = () => {
  const { handleBuy, handleAddToCart } = useContext(StoreContext);
  const navigate = useNavigate();
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
      image: "images/weekend fest.jpg",
    },
    {
      id: 3,
      title: "Family Pack",
      price: 799,
      description: "Perfect for a family meal with all the best dishes.",
      image: "images/family.jpg",
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
                <button
                  className={styles.buyButton}
                  onClick={() => {
                    console.log("offer image from handle buy", offer.image);
                    handleBuy(navigate, offer.name, offer.price, offer.image);
                  }}
                >
                  Buy Now
                </button>
                <button
                  className={styles.addToCartButton}
                  onClick={() => {
                    handleAddToCart(offer.title, offer.price, offer.image);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SpecialOffer;
