import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "./Auth";

const Logout = () => {
  const { removeTokens } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem("access");

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch("/api/v1/logout/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error logging out:", error);
      } finally {
        removeTokens(); // Clear tokens from local storage
        navigate("/login"); // Redirect to login page
      }
    };

    handleLogout();
  }, [navigate, removeTokens]);

  return <div>Logging out...</div>; // Optional loading message
};

export default Logout;
