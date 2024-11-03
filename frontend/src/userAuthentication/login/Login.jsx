import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Login.module.css"; // Ensure to keep your styles
import Header from "../../components/Header"; // Your header component
import useAuth from "../Auth"; // Assuming useAuth contains saveTokens and removeTokens

const Login = () => {
  const { saveTokens, removeTokens } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(""); // Clear any existing error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("/api/v1/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        saveTokens(data.access, data.refresh); // Save tokens to localStorage
        alert("Login successful");
      } else {
        removeTokens(); // Clear tokens if login fails
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Login failed. Please try again later.");
    }
  };

  return (
    <>
      <Header />
      <div className={styles.loginContainer}>
        <div className={styles.formWrapper}>
          <h2 className={styles.heading}>Welcome Back!</h2>
          <p className={styles.subHeading}>
            Log in to indulge in delicious offerings!
          </p>
          <form onSubmit={handleSubmit}>
            {/* Username Input */}
            <div className={`form-outline mb-4 ${styles.formGroup}`}>
              <input
                type="text"
                id="username"
                name="username"
                className={`form-control ${styles.inputField}`}
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label
                className={`form-label ${styles.label}`}
                htmlFor="username"
              >
                Username
              </label>
            </div>

            {/* Password Input */}
            <div className={`form-outline mb-4 ${styles.formGroup}`}>
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${styles.inputField}`}
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label
                className={`form-label ${styles.label}`}
                htmlFor="password"
              >
                Password
              </label>
            </div>

            {/* Error Message */}
            {error && <p className={`${styles.errorMessage}`}>{error}</p>}

            {/* Remember Me & Forgot Password */}
            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="col">
                <a href="#!" className={styles.forgotPassword}>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className={`btn btn-primary btn-block mb-4 ${styles.btnPrimary}`}
            >
              Sign In
            </button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p>
                Not a member?{" "}
                <NavLink to="/register" className={styles.registerLink}>
                  Register
                </NavLink>
              </p>
              <p>Or sign in with:</p>

              {/* Social Media Buttons */}
              <div className={styles.socialIcons}>
                <button className={styles.socialBtn}>
                  <i className="fab fa-facebook-f"></i>
                </button>
                <button className={styles.socialBtn}>
                  <i className="fab fa-google"></i>
                </button>
                <button className={styles.socialBtn}>
                  <i className="fab fa-twitter"></i>
                </button>
                <button className={styles.socialBtn}>
                  <i className="fab fa-github"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
