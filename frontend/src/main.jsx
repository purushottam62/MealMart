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
import Contact from "./components/contact/Contact.jsx";
import UserProfile from "./components/userprofile/UserProfile.jsx";
import LocationComponent from "./location/LocationComponent.jsx";
import Logout from "./userAuthentication/Logout.jsx";
import Invoice from "./components/invoice/Invoice.jsx";
import Store from "./components/store.jsx";
import ReactWrapper from "./ReactWrapper.jsx";
import Home from "./components/Home.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
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
    path: "/logout",
    element: <Logout></Logout>,
  },
  {
    path: "/deals",
    element: <SpecialOffers></SpecialOffers>,
  },
  {
    path: "/contact",
    element: <Contact></Contact>,
  },
  {
    path: "/profile",
    element: <UserProfile></UserProfile>,
  },
  {
    path: "/address",
    element: <LocationComponent></LocationComponent>,
  },
  {
    path: "/invoice",
    element: <Invoice></Invoice>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Store>
      <RouterProvider router={router}></RouterProvider>
    </Store>
  </StrictMode>
);
