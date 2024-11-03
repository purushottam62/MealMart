import React from "react";
import Store from "./components/store";
import App from "./App";
import Menu from "./components/menu/Menu";

const ReactWrapper = () => {
  return (
    <Store>
      <App></App>
      <Menu></Menu>
    </Store>
  );
};

export default ReactWrapper;
