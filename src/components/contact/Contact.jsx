import React from "react";
import styles from "./Contact.module.css"; // Ensure to include this in your existing CSS module
import Header from "../Header";
import Navigation from "../Navigation";

const Contact = () => {
  return (
    <>
      <Header></Header>
      <div className={styles.contact}>
        <div className={styles.container}>
          <h2 className={styles.contactHeading}>Get in Touch!</h2>
          <p className={styles.contactDescription}>
            We'd love to hear from you! Fill out the form below or reach us at
            our social media.
          </p>
          <form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="message">Message:</label>
              <textarea id="message" rows="5" required></textarea>
            </div>
            <button type="submit" className={styles.btnSubmit}>
              Send Message
            </button>
          </form>
          <div className={styles.socialLinks}>
            <h3>Follow Us</h3>
            <a href="#" className={styles.socialLink}>
              Facebook
            </a>
            <a
              href="https://www.instagram.com/purushottam620xyz/"
              className={styles.socialLink}
            >
              Instagram
            </a>
            <a
              href="https://x.com/Purusho91431753"
              className={styles.socialLink}
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
