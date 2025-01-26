import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='bg-[#FC8019] text-white p-4'>
      <div className='container mx-auto flex justify-between'>
        <h1 className='text-xl font-bold'>Food Delivery</h1>
        <div className='space-x-10 font-semibold'>
        <Link to="/menu" className='hover:underline' >Menu</Link>
      <Link to="/orders" className='hover:underline' >Orders</Link>
      <Link to="/" className='hover:underline' >Logout</Link>
      <Link to="/cart" >Cart</Link>
        </div>
      </div>
    </nav>
  )
}
