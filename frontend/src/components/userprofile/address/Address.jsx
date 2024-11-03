import React, { useEffect, useState } from "react";
import styles from "./Address.module.css";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const token = localStorage.getItem("access"); // Assume the token is saved in localStorage

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/v2/addresses/",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );
        if (!response.ok) throw new Error("Failed to fetch addresses");
        const data = await response.json();
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchAddresses();
  }, [token]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Your Saved Addresses</h2>
      {addresses.length > 0 ? (
        addresses.map((address, index) => (
          <div key={index} className={styles.addressItem}>
            <div className={styles.details}>
              <p>
                <strong>Street:</strong> {address.street}
              </p>
              <p>
                <strong>House Number:</strong> {address.houseNumber}
              </p>
              <p>
                <strong>Famous Location:</strong> {address.famousLocation}
              </p>
              <p>
                <strong>Pincode:</strong> {address.pincode}
              </p>
              <p>
                <strong>City:</strong> {address.city}
              </p>
              <p>
                <strong>State:</strong> {address.state}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noAddresses}>No addresses found.</p>
      )}
    </div>
  );
};

export default Address;
