import React from "react";
import styles from "../App.module.css";
import { NavLink } from "react-router-dom";

const Section = () => {
  return (
    <div>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroText}>
            <h2 className={styles.heroHeading}>Delicious & Fresh Meals</h2>
            <p className={styles.heroP}>
              Craving something tasty? Order now and enjoy a delightful meal in
              no time!
            </p>
            <NavLink to="/menu" className={styles.btn}>
              Explore Menu
            </NavLink>
          </div>
          <div className={styles.heroImage}>
            <img
              src="images/burger.jpeg"
              alt="Delicious meal"
              className={styles.offerImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.promo}>
        <div className={styles.container}>
          <h2>Current Promotions</h2>
          <div className={styles.promoItems}>
            <div className={styles.promoItem}>
              <img
                src="images/burger.jpeg"
                alt="Promo 1"
                className={styles.offerImage}
              />
              <h3>Big Burger Deal</h3>
              <p>
                Get a big burger and fries for just $5.99. Limited time offer!
              </p>
              <a className={`${styles.btn} ${styles.btnSecondary}`} href="#">
                Order Now
              </a>
            </div>
            <div className={styles.promoItem}>
              <img
                src="images/burger.jpeg"
                alt="Promo 2"
                className={styles.offerImage}
              />
              <h3>Family Combo Pack</h3>
              <p>
                Perfect for sharing! Get 2 large pizzas and drinks for only
                $19.99.
              </p>
              <a className={`${styles.btn} ${styles.btnSecondary}`} href="#">
                Order Now
              </a>
            </div>
            <div className={styles.promoItem}>
              <img
                src="images/family pack.jpeg"
                alt="Promo 3"
                className={styles.offerImage}
              />
              <h3>Happy Meal</h3>
              <p>Order our famous Happy Meal with a surprise toy!</p>
              <a className={`${styles.btn} ${styles.btnSecondary}`} href="#">
                Order Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.container}>
          <h2>About Us</h2>
          <p>
            At FoodLovers, we bring fresh and delicious meals to your table
            every day. Our passion for great food is what drives us, and we are
            committed to using the best ingredients for our dishes.
          </p>
          <img
            src="images/burger.jpeg"
            alt="Restaurant Image"
            className={styles.offerImage}
          />
        </div>
      </section>
    </div>
  );
};

export default Section;
