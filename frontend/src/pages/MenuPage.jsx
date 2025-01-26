import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { useAppContext } from "../context/AppContext";

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();
  const { addToCart } = useAppContext();
  const [initialData, setInitialData] = useState(null);
  const [showItems, setShowItems] = useState([]);

  const [loading, setLoading] = useState(false);

  const fetchMenu = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:8000/menu");
    // console.log(response.data);
    setMenuItems(response.data);
    setShowItems(response.data);
    setLoading(false);
  };
  useEffect(() => {
    fetchMenu();
  }, []);

  const handleEditClick = (item) => {
    setOpenForm(true);
    setInitialData(item);
  };
  // console.log("cart item",cart);

  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold text-center">Menu</h2>
          <div className="">
            <input
              type="text"
              placeholder="Search Items..."
              className="mt-4 p-2 border rounded"
              onChange={(e) => {
                const searchTerm = e.target.value.toLowerCase();
                setShowItems(() =>
                  menuItems.filter((item) =>
                    item.name.toLowerCase().includes(searchTerm)
                  )
                );
              }}
            />
          </div>
          <button
            onClick={() => setOpenForm(true)}
            className="mt-4 bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 cursor-pointer"
          >
            Add New Item
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {!loading ? (
            showItems?.length ? (
              showItems.map((item) => (
                <div key={item._id} className="bg-white p-4 shadow-md rounded">
                  <div className="w-full h-[200px]">
                    <img
                      src={item.thumbnail}
                      alt=""
                      className="object-cover w-full h-full rounded"
                    />
                  </div>
                  <div className="">
                    <h3 className="text-lg font-bold capitalize">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 capitalize">
                      Category: {item.category}
                    </p>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <div className="flex items-center justify-between w-full gap-4">
                      <button
                        onClick={() => handleEditClick(item)}
                        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 cursor-pointer w-full"
                      >
                        Edit Item
                      </button>
                      <button
                        onClick={() => addToCart(item)}
                        className="mt-4 bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 cursor-pointer w-full"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full text-2xl font-bold col-span-full">
                No Items Found
              </div>
            )
          ) : (
            <div className="text-center w-full text-2xl font-bold col-span-full">
              Loading...
            </div>
          )}
        </div>
      </div>
      {openForm && (
        <div className="w-full h-screen fixed bg-gray-300 top-0 left-0 flex items-center justify-center">
          <div
            onClick={() => {
              setOpenForm(false);
              setInitialData(null);
            }}
            className="absolute top-0 left-0 p-4 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-black"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <ItemForm
            initialData={initialData}
            setOpenForm={setOpenForm}
            fetchMenu={fetchMenu}
          />
        </div>
      )}
    </div>
  );
}
