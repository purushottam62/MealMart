import React from "react";
import styles from "./App.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Section from "./components/Section";
import Store from "./components/store";
import Menu from "./components/menu/Menu";

const HomePage = () => {
  return (
    <div>
      <Store>
        <Menu></Menu>
        <Header></Header>
        <Section></Section>
        <Footer></Footer>
      </Store>
    </div>
  );
};

export default HomePage;
