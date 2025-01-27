import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#FC8019] text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Food Delivery</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`space-x-10 font-semibold hidden md:flex`}>
          <Link to="/" className="hover:underline" onClick={handleLinkClick}>
            Menu
          </Link>
          <Link to="/orders" className="hover:underline" onClick={handleLinkClick}>
            Orders
          </Link>
          <Link to="/cart" onClick={handleLinkClick}>Cart</Link>
          <button onClick={() => { handleLogout(); handleLinkClick(); }} className="hover:underline cursor-pointer">
            Logout
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden space-y-2 mt-2 font-semibold">
          <Link to="/" className="block hover:underline" onClick={handleLinkClick}>
            Menu
          </Link>
          <Link to="/orders" className="block hover:underline" onClick={handleLinkClick}>
            Orders
          </Link>
          <Link to="/cart" className="block hover:underline" onClick={handleLinkClick}>
            Cart
          </Link>
          <button onClick={() => { handleLogout(); handleLinkClick(); }} className="block hover:underline cursor-pointer">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
