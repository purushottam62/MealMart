import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Invoice.module.css";
import Header from "../Header";

const Invoice = () => {
  const location = useLocation();
  const { price, itemName, image } = location.state || {};
  console.log("item image for checking had it been came", image);
  const token = localStorage.getItem("access");

  const [wantsDelivery, setWantsDelivery] = useState(false);
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [pincodechangeonsavedaddress, setpincodechangeonsavedaddress] =
    useState(false);
  const [address, setAddress] = useState({
    city: "",
    state: "",
    street: "",
    houseNumber: "",
    famousLocation: "",
  });

  const [pinCode, setPincode] = useState("");
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [loadingAddress, setLoadingAddress] = useState(false); // New state for loading address

  useEffect(() => {
    if (wantsDelivery) {
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
            console.log(data);
            setSavedAddresses(data);

            if (data.length > 0) {
              setAddress(data[0]);
            }
          } else {
            console.error("Error fetching addresses:", data.error);
          }
        })
        .catch((error) => console.error("Error fetching addresses:", error));
    }
  }, [wantsDelivery]);

  useEffect(() => {
    if (pinCode && pinCode > 100000 && !pincodechangeonsavedaddress) {
      setLoadingAddress(true); // Start loading when pin code is entered
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
        .catch((error) => console.error("Error fetching address:", error))
        .finally(() => {
          setLoadingAddress(false); // Stop loading once done
        });
    } else {
      setAddress((prevAddress) => ({
        ...prevAddress,
        city: "",
        state: "",
      }));
    }
  }, [pinCode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    const payload = {
      ...address,
      pinCode: pinCode,
      token,
    };
    console.log(payload);

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
        alert("New Address saved successfully!");
      })
      .catch((error) => console.error("Error placing order:", error));
  };

  const handlePlaceOrder = () => {
    const payload = {
      token, // Send token in the body as per your requirement
      itemName,
      price,
      imageUrl: image,
      address: {
        street: address.street,
        houseNumber: address.houseNumber,
        city: address.city,
        state: address.state,
        famousLocation: address.famousLocation,
        pinCode: pinCode,
      },
    };
    console.log(payload.address);

    fetch("http://localhost:8000/api/v3/accept_order/", {
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
    <>
      <Header></Header>
      <div className={styles.invoiceContainer}>
        <h1 className={styles.title}>Invoice</h1>
        <div className={styles.invoiceDetails}>
          <h2 className={styles.itemName}>Item: {itemName}</h2>
          <p className={styles.price}>Price: ₹{price}</p>
          {image && <img src={image} alt={itemName} className={styles.image} />}
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
                  <div
                    key={index}
                    className={styles.addressCard}
                    onClick={() => {
                      console.log(savedAddress);
                      setAddress(savedAddress);
                      setPincode(savedAddress.pincode);
                      setpincodechangeonsavedaddress(true);
                    }}
                  >
                    <p>
                      <strong>
                        {savedAddress.street}, {savedAddress.houseNumber}
                      </strong>
                    </p>
                    <p>
                      {savedAddress.city}, {savedAddress.state}
                    </p>
                    <p>{savedAddress.famousLocation}</p>
                  </div>
                ))}
                <button
                  className={styles.button}
                  onClick={() => setAddingNewAddress(true)}
                >
                  Add a New Address
                </button>
              </>
            ) : (
              <>
                <button
                  className={styles.button}
                  onClick={() => setAddingNewAddress(true)}
                >
                  Add a New Address
                </button>
                <p>No saved addresses found. Please add a new address below:</p>
              </>
            )}

            {addingNewAddress && (
              <div>
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
                <button
                  className={styles.button}
                  onClick={() => handleSaveAddress()}
                >
                  Save Address
                </button>
              </div>
            )}

            {loadingAddress ? ( // Show loading while fetching address
              <p>Fetching address details...</p>
            ) : (
              <>
                {pinCode && pinCode.length === 6 ? (
                  <>
                    <p>City: {address.city || "Not fetched"}</p>
                    <p>State: {address.state || "Not fetched"}</p>
                  </>
                ) : (
                  <p>Please enter a valid pin code to fetch address details.</p>
                )}
              </>
            )}
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
    </>
  );
};

export default Invoice;
