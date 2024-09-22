import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Login.module.css";

import Header from "../../components/Header";

const Login = () => {
  return (
    <>
      <Header></Header>
      <div className={styles.loginContainer}>
        <div className={styles.formWrapper}>
          <h2 className={styles.heading}>Welcome Back!</h2>
          <p className={styles.subHeading}>
            Log in to indulge in delicious offerings!
          </p>
          <form>
            {/* Email Input */}
            <div className={`form-outline mb-4 ${styles.formGroup}`}>
              <input
                type="email"
                id="form2Example1"
                className={`form-control ${styles.inputField}`}
                required
              />
              <label
                className={`form-label ${styles.label}`}
                htmlFor="form2Example1"
              >
                Email Address
              </label>
            </div>

            {/* Password Input */}
            <div className={`form-outline mb-4 ${styles.formGroup}`}>
              <input
                type="password"
                id="form2Example2"
                className={`form-control ${styles.inputField}`}
                required
              />
              <label
                className={`form-label ${styles.label}`}
                htmlFor="form2Example2"
              >
                Password
              </label>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="form2Example31"
                    checked
                  />
                  <label className="form-check-label" htmlFor="form2Example31">
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
