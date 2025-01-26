import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const AppContextData = createContext(null);

const AppContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const addToCart = async (item) => {
    const existingItem = cart.find((cartItem) => cartItem._id === item._id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
      localStorage.setItem(
        "cart",
        JSON.stringify(
          cart.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          )
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...item, quantity: 1 }])
      );
    }
    toast.success("Item added to cart");
    console.log(cart);
  };

  const value = {
    user,
    setUser,
    cart,
    setCart,
    orderDetails,
    setOrderDetails,
    token,
    setToken,
    addToCart,
  };

  return (
    <AppContextData.Provider value={value}>{children}</AppContextData.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContextData);
};

export default AppContext;
