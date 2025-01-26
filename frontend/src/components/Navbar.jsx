import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  }
  return (
    <nav className="bg-[#FC8019] text-white p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-bold">Food Delivery</h1>
        <div className="space-x-10 font-semibold">
          <Link to="/" className="hover:underline">
            Menu
          </Link>
          <Link to="/orders" className="hover:underline">
            Orders
          </Link>
          <Link to="/cart">Cart</Link>
          <button onClick={handleLogout} className="hover:underline cursor-pointer">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
