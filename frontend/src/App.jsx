import React,{useState} from 'react'
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import MenuPage from './pages/MenuPage'
import OrderPage from './pages/OrderPage'
import Navbar from './components/Navbar'
import './App.css'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast";
import CartPage from './pages/CartPage'


function App() {
    const [cart, setCart] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]); // Order details after placing order
  

  return (
   
    <Router>
        <Toaster position="top-right" reverseOrder={false} />

      <Navbar/>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/menu' element={<MenuPage cart={cart} setCart = {setCart}/>}/>
        <Route path='/cart' element={<CartPage cart={cart} setCart = {setCart} setOrderDetails = {setOrderDetails}/>}/>
        <Route path='/orders' element={<OrderPage orderDetails={orderDetails}/>}/>

      </Routes>
    </Router>
  )
}

export default App
