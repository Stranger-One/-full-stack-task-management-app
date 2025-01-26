import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


export default function MenuPage({cart,setCart}) {
  const [menuItems,setMenuItems] = useState([]);
   const navigate = useNavigate()
  useEffect(() => {
    const fetchMenu = async () => {
      const response = await axios.get("http://localhost:8000/menu")
      // console.log(response.data);
      setMenuItems(response.data);
      
    };
    fetchMenu();
  },[]);
 


const addToCart = (item ) => {
  const existingItem = cart.find((cartItem) => cartItem._id === item._id);
  if(existingItem){
    setCart(cart.map((cartItem) => cartItem._id === item._id ? {...cartItem,quantity:cartItem.quantity +1 }: cartItem)
  )
  }
  else{
  setCart([...cart,{...item,quantity:1}]);
  }
  navigate("/cart");  
}
// console.log("cart item",cart);

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto py-8'>
        <h2 className='text-3xl font-bold mb-6 text-center'>Menu</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {menuItems.map((item) => (
          <div key={item._id}
          className='bg-white p-4 shadow-md rounded text-center'>
            <h3 className='text-lg font-bold'>{item.name}</h3>
            <p className='text-gray-600'>Category: {item.category}</p>
            <p className='text-gray-600'>Price: ${item.price}</p>
            <button onClick={() => addToCart(item)} className='mt-4 bg-amber-500 text-white py-2 px-4 rounded hover:bg-amber-600'>Add to Cart</button>
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}

