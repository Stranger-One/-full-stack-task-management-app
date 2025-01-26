import React,{useState} from 'react';
import axios from "axios";
import {Link, useBeforeUnload, useNavigate} from "react-router-dom"
import { toast } from "react-hot-toast";



export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
  
    const handleRegister = async(e) => {
      e.preventDefault();

      if(!username || !password){
        toast.error("please fill in all fields!",{position:"top-center"});
        return;
      }
      try{
        const response = await axios.post("http://localhost:8000/auth/register",{username,password});
         console.log("data",response.data);
         if(response.status === 201){
            toast.success("User has Registered Successfully!",{position:'top-center'})
            setTimeout(() => navigate("/menu"),2000);
         }
        // navigate("/menu")
        
      }catch(err){
        toast.error(
            err.response?.data?.message || "Registration failed. Please try again.",
            { position: "top-center" }
          );    
      }
    }
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
    <form onSubmit={handleRegister} className='bg-white p-8 rounded shadow-md w-80 space-y-4'>
      <h2 className='text-2xl font-bold text-center'>Register</h2>
      <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full border p-2 rounded outline-0 border-amber-200'/>
      <input type='text' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border p-2 rounded outline-0 border-amber-200'/>
       <button type='submit' className='w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-600'>Register</button>
       <a className='text-sm text-sky-500 underline'>Already have an account</a> <Link to="/" className='text-md text-orange-700'>  Login</Link>
    </form>
  </div>
  )
}
