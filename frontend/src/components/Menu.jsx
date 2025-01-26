import React from "react";

export default function Menu({item, addToCart}) {
  return (
    <div key={item._id} className="bg-white p-4 shadow-md rounded text-center">
      <div className="w-full h-[200px]">
        <img
          src={item.thumbnail}
          alt=""
          className="object-cover w-full h-full rounded"
        />
      </div>
      <h3 className="text-lg font-bold">{item.name}</h3>
      <p className="text-gray-600">Category: {item.category}</p>
      <p className="text-gray-600">Price: ₹{item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-4 bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600 cursor-pointer"
      >
        Add to Cart
      </button>
    </div>
  );
}
