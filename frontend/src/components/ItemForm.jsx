import axios from "axios";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const ItemForm = ({ initialData = {}, setOpenForm, fetchMenu }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    file: null,
    availability: true,
    category: "",
    price: "",
  });

  // Populate form with initial data when provided (for updating an item)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        file: null, // File inputs can't be pre-populated
        availability: initialData.availability ?? true,
        category: initialData.category || "",
        price: initialData.price || "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fileData = new FormData();
    fileData.append("file", formData.file);
    fileData.append("name", formData.name);
    fileData.append("availability", formData.availability);
    fileData.append("category", formData.category);
    fileData.append("price", formData.price);

    // console.log("submissionData", fileData);
    let response;

    try {
      if (initialData?._id) {
        // console.log("updating item");
        response = await axios.put(
          `${import.meta.env.VITE_SERVER_BASE_URL}/menu/update/${initialData?._id}`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        // console.log("adding item");
        response = await axios.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/menu/create`,
          fileData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      // console.log(response.data);
      if (response.data) {
        toast.success("Item saved successfully");
        setFormData({
          name: "",
          file: null,
          availability: true,
          category: "",
          price: "",
        });
        setOpenForm(false)
        fetchMenu()
      }
    } catch (error) {
      console.error("Error saving item:", error);
      toast.error("Failed to save item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800">
        {initialData?.id ? "Update Item" : "Add New Item"}
      </h2>

      {/* Name Input */}
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
          placeholder="Enter item name"
          required
        />
      </div>

      {/* File Input */}
      <div>
        <label
          htmlFor="file"
          className="block text-sm font-medium text-gray-700"
        >
          File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
        />
      </div>

      {/* Availability Input */}
      <div className="flex items-center">
        <input
          type="checkbox"
          id="availability"
          name="availability"
          checked={formData.availability}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label
          htmlFor="availability"
          className="ml-2 block text-sm text-gray-800"
        >
          Available
        </label>
      </div>

      {/* Category Input */}
      <div>
        <label
          htmlFor="category"
          className="block text-sm font-medium text-gray-700"
        >
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="non-veg">Non-Veg</option>
          <option value="dessert">Dessert</option>
          <option value="snacks">Snacks</option>
        </select>
      </div>

      {/* Price Input */}
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="text"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-4"
          placeholder="Enter item price"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          disabled={loading}
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none flex items-center justify-center cursor-pointer"
        >
          {loading ? <Loader /> : initialData?._id ? "Update Item" : "Add Item"}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
