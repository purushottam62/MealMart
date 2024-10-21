import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";

const HomePage = () => {
  return (
    <div>
      <Header></Header>
      <Section></Section>
      <Footer></Footer>
    </div>
  );
};

export default HomePage;
