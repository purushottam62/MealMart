import React, { useState } from "react";
import styles from "./DeliveryAddress.module.css";

const DeliveryAddress = () => {
  const getToken = () => localStorage.getItem("token");

  const [formData, setFormData] = useState({
    street_number: "",
    house_number: "",
    house_name: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fetchAddressDetails = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v2/fetch-address/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify({ pincode: formData.pincode }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setFormData((prev) => ({
          ...prev,
          city: data.city,
          state: data.state,
        }));
      } else {
        setError(data.error || "Unable to fetch address details.");
      }
    } catch (error) {
      setError("Network error, please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/api/v2/save-address/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (response.ok) {
        alert(data.message);
      } else {
        setError("Failed to save address.");
      }
    } catch (error) {
      setError("Network error, please try again.");
    }
  };

  return (
    <div className={styles.addressContainer}>
      <h1 className={styles.title}>Delivery Address</h1>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Street Number:</label>
          <input
            type="text"
            name="street_number"
            value={formData.street_number}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>House Number:</label>
          <input
            type="text"
            name="house_number"
            value={formData.house_number}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>House Name:</label>
          <input
            type="text"
            name="house_name"
            value={formData.house_name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Landmark:</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <button
            type="button"
            onClick={fetchAddressDetails}
            className={styles.button}
          >
            Fetch City & State
          </button>
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>City:</label>
          <input
            type="text"
            name="city"
            value={formData.city}
            className={styles.input}
            readOnly
          />
        </div>
        <div className={styles.inputGroup}>
          <label className={styles.label}>State:</label>
          <input
            type="text"
            name="state"
            value={formData.state}
            className={styles.input}
            readOnly
          />
        </div>
        <div className={styles.buttonContainer}>
          <button type="submit" className={styles.button}>
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryAddress;
