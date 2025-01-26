import React,{useState} from 'react';
import axios from "axios";
import {Link, useBeforeUnload, useNavigate} from "react-router-dom"

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:8000/auth/login",{username,password});
      localStorage.setItem("token",response.data.token);
      console.log("token",response.data);
      navigate("/menu")
      
    }catch(err){
      alert("login Failed. Please check your credentials");
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form onSubmit={handleLogin} className='bg-white p-8 rounded shadow-md w-80 space-y-4'>
        <h2 className='text-2xl font-bold text-center'>Login</h2>
        <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full border p-2 rounded outline-0 border-amber-200'/>
        <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border p-2 rounded outline-0 border-amber-200'/>
         <button type='submit' className='w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-600'>Login</button>
         <a className='text-sm text-sky-500 underline'>Don't have an account</a> <Link to="/register" className='text-md text-orange-700'>  Register</Link>
      </form>
    </div>
  )
}
