import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

const CartPage = () => {
  const { cart, setCart, setOrderDetails } = useAppContext();

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, []);

  const updateQuantity = (id, delta) => {
    setCart(
      cart
        .map((item) =>
          item._id === id ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
    localStorage.setItem(
      "cart",
      JSON.stringify(
        cart
          .map((item) =>
            item._id === id
              ? { ...item, quantity: item.quantity + delta }
              : item
          )
          .filter((item) => item.quantity > 0)
      )
    );
  };

  const navigate = useNavigate();

  const calculateTotal = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    const order = {
      items: cart,
      totalAmount: calculateTotal(),
      date: new Date().toLocaleString(),
    };

    const orderData = cart.map((item) => ({
      itemId: item._id,
      quantity: item.quantity,
    }));
    console.log("Order Data", orderData);

    const response = await axios.post("http://localhost:8000/orders", {
      items: orderData,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    console.log("Order Response", response.data);
    
    

    setOrderDetails((prevOrders) => [...prevOrders, order]);
    setCart([]);
    localStorage.removeItem("cart");
    navigate("/orders");
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cart?.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded mb-4"
            >
              <div>
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-gray-600">₹{item.price}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  onClick={() => updateQuantity(item._id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  onClick={() => updateQuantity(item._id, 1)}
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="text-right mt-4">
            <p className="text-lg font-bold">Total: ₹{calculateTotal()}</p>
            <button
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={placeOrder}
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
