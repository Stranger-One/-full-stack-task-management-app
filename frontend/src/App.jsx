import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import OrderPage from "./pages/OrderPage";
import Navbar from "./components/Navbar";
import "./App.css";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import CartPage from "./pages/CartPage";

function App() {
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]); // Order details after placing order
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();



  // <Toaster position="top-right" reverseOrder={false} />
  return (
    <div className="w-full h-full">
      <Navbar/>
      <Outlet />
      <Toaster/>
    </div>
  );
}

export default App;
