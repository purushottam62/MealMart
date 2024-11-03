import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Invoice.module.css";

const Invoice = () => {
  const location = useLocation();
  const { price, itemName, itemImage } = location.state || {};
  const token = localStorage.getItem("access");

  const [wantsDelivery, setWantsDelivery] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    houseNumber: "",
    famousLocation: "",
  });

  const [pinCode, setPincode] = useState(""); // New state for pinCode

  useEffect(() => {
    if (wantsDelivery) {
      // Fetch saved addresses when user wants delivery
      fetch("http://localhost:8000/api/v2/addresses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data && Array.isArray(data)) {
            setSavedAddresses(data);
            // If there are saved addresses, set the first one as the default
            if (data.length > 0) {
              setAddress(data[0]);
            }
          } else {
            console.error("Error fetching addresses:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    }
  }, [wantsDelivery]); // Fetch saved addresses only when wantsDelivery changes

  useEffect(() => {
    if (pinCode && pinCode > 100000) {
      // Fetch city and state based on pinCode
      fetch("http://localhost:8000/api/v2/fetch-address/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.city && data.state) {
            setAddress((prevAddress) => ({
              ...prevAddress,
              city: data.city,
              state: data.state,
            }));
          } else {
            console.error("Error fetching address:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching address:", error));
    }
  }, [pinCode]); // Fetch city/state when pinCode changes

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const payload = {
      ...address,
      token,
    };

    fetch("http://localhost:8000/api/v2/save-address/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        alert("Order placed successfully!");
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  return (
    <div className={styles.invoiceContainer}>
      <h1 className={styles.title}>Invoice</h1>
      <div className={styles.invoiceDetails}>
        <h2 className={styles.itemName}>Item: {itemName}</h2>
        <p className={styles.price}>Price: ₹{price}</p>
        {itemImage && (
          <img src={itemImage} alt={itemName} className={styles.itemImage} />
        )}
      </div>

      {/* Delivery Option Section */}
      <div className={styles.deliveryOption}>
        <h2>Do you want delivery?</h2>
        <label>
          <input
            type="checkbox"
            checked={wantsDelivery}
            onChange={() => setWantsDelivery(!wantsDelivery)}
          />
          Yes, I want delivery
        </label>
      </div>

      {/* Conditional Delivery Address Section */}
      {wantsDelivery && (
        <div className={styles.deliveryAddress}>
          <h2>Delivery Address</h2>
          {savedAddresses.length > 0 ? (
            <>
              <h3>Your Saved Addresses:</h3>
              {savedAddresses.map((savedAddress, index) => (
                <div key={index}>
                  <p>
                    {savedAddress.street}, {savedAddress.houseNumber},{" "}
                    {savedAddress.city}, {savedAddress.state},{" "}
                    {savedAddress.famousLocation}
                  </p>
                  <button onClick={() => setAddress(savedAddress)}>
                    Select this address
                  </button>
                </div>
              ))}
            </>
          ) : (
            <p>No saved addresses found. Please add a new address below:</p>
          )}
          <p>City: {address.city || "Fetching..."}</p>
          <p>State: {address.state || "Fetching..."}</p>
          <input
            type="text"
            name="street"
            placeholder="Street Number"
            value={address.street}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="houseNumber"
            placeholder="House Number"
            value={address.houseNumber}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="famousLocation"
            placeholder="Famous Location"
            value={address.famousLocation}
            onChange={handleInputChange}
            className={styles.input}
          />
          <input
            type="text"
            name="pinCode"
            placeholder="Pin Code"
            value={pinCode}
            onChange={(e) => setPincode(e.target.value)}
            className={styles.input}
          />
        </div>
      )}

      {/* Buttons Section */}
      <div className={styles.buttonContainer}>
        <button className={styles.button} onClick={handlePlaceOrder}>
          Place Order
        </button>
        <button className={styles.button}>Download PDF</button>
        <button className={styles.button}>Print Invoice</button>
      </div>
    </div>
  );
};

export default Invoice;
