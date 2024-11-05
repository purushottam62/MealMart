import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const handleBuy = (navigate, itemName, price, image) => {
    // Corrected the order of parameters
    console.log("buy button clicked");
    const token = localStorage.getItem("access");
    if (!token) {
      alert("please login/register first to buy");

      return;
    }
    navigate("/invoice", { state: { price, itemName, image } });
  };
  const handleAddToCart = async (name, price, image) => {
    const token = localStorage.getItem("access"); // Adjust if you store the token differently
    if (!token) {
      alert("please login/register first");
      return;
    }

    try {
      const response = await fetch("/api/v4/add-to-cart/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          item_name: name,
          item_price: price,
          item_image: image,
          quantity: 1,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Item added to cart:", data);
        alert("item added to cart");
        // Optionally, update the cart state here to reflect the new item
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <StoreContext.Provider
      value={{
        handleBuy,
        handleAddToCart,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
