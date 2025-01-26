import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderPage = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      // console.log("Token", token);

      if (!token) {
        console.error("No Token Found. User not authenticated.");
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER_BASE_URL}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        // console.log("response", response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Your Orders</h2>
        <div className="bg-white p-6 shadow-md rounded">
          {orders?.length === 0 ? (
            <p className="text-gray-600">No Orders found.</p>
          ) : (
            <ul>
              {orders.reverse().map((order, index) => (
                <li
                  key={index}
                  className="border-b border-gray-200 py-4 flex justify-between text-black"
                >
                  <span>Order ID: {order._id}</span>
                  <span>Total: ₹{order.totalAmount}</span>
                  <span>Status: pending</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
