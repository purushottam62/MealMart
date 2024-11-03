import React, { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const StoreContext = createContext();

const Store = ({ children }) => {
  const handleBuy = (navigate, itemName, price, image) => {
    // Corrected the order of parameters
    console.log("buy button clicked");
    navigate("/invoice", { state: { price, itemName, image } });
  };

  return (
    <StoreContext.Provider
      value={{
        handleBuy,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default Store;
