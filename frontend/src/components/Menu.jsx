import React, { useState } from "react";
import Loader from "./Loader";
import { useAppContext } from "../context/AppContext";
import axios from "axios";

export default function Menu({ item, handleEditClick, fetchMenu }) {
  const { addToCart } = useAppContext();
  const [deleting, setDeleting] = useState(false)
  
  const handleDeleteItem = async (item) => {
    setDeleting(true)
    const response = await axios.delete(
      `${import.meta.env.VITE_SERVER_BASE_URL}/menu/delete/${item._id}`,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // console.log(response);
    fetchMenu();
    setDeleting(false)
  };

  return (
    <div key={item._id} className="bg-white p-4 shadow-md rounded">
      <div className="w-full h-[200px]">
        <img
          src={item.thumbnail}
          alt=""
          className="object-cover w-full h-full rounded"
        />
      </div>
      <div className="">
        <h3 className="text-lg font-bold capitalize">{item.name}</h3>
        <p className="text-gray-600 capitalize">Category: {item.category}</p>
        <p className="text-gray-600">Price: ₹{item.price}</p>
        <div className="grid grid-cols-2 w-full gap-2 mt-4">
          <button
            onClick={() => handleEditClick(item)}
            className=" bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer w-full whitespace-nowrap"
          >
            Edit Item
          </button>
          <button
            onClick={() => handleDeleteItem(item)}
            className=" bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 cursor-pointer w-full whitespace-nowrap"
          >
            {deleting ? <Loader /> : "Delete Item"}
          </button>
          <button
            onClick={() => addToCart(item)}
            className=" bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 cursor-pointer w-full col-span-full whitespace-nowrap"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
