import { useState, useEffect } from "react";
// import jwtDecode from "jwt-decode";
import * as jwtDecode from "jwt-decode";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem("access", accessToken);
    localStorage.setItem("refresh", refreshToken);
    setIsAuthenticated(true);
  };

  const removeTokens = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsAuthenticated(false);
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      removeTokens();
      return;
    }
    try {
      const response = await fetch("/api/token/refresh/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh: refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("access", data.access); // Set the new access token
        setIsAuthenticated(true);
      } else {
        removeTokens(); // If refresh fails, clear tokens
        console.error("Session expired. Please log in again.");
      }
    } catch (error) {
      removeTokens();
      console.error("Error refreshing token:", error);
    }
  };

  const checkTokenExpiration = () => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      // Refresh token if it's about to expire in the next minute
      if (decodedToken.exp - currentTime < 60) {
        refreshAccessToken();
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return { isAuthenticated, saveTokens, removeTokens };
};

export default useAuth;
