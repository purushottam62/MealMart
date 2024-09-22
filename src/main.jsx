import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./userAuthentication/login/Login.jsx";
import Register from "./userAuthentication/Register.jsx";
import Menu from "./components/menu/Menu.jsx";
import SpecialOffers from "./components/specialoffers/SpecialOffers.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },

  {
    path: "/menu",
    element: <Menu></Menu>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/deals",
    element: <SpecialOffers></SpecialOffers>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
