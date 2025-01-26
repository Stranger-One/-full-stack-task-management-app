import React, { useState } from 'react';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Loader from '../components/Loader';

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      toast.success("Login Successful");
      navigate("/");
      console.log("token", response.data);
    } catch (err) {
      alert("Login Failed. Please check your credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleLogin} className='bg-white p-8 rounded shadow-md w-80 space-y-4'>
      <h2 className='text-2xl font-bold text-center'>Login</h2>
      <input type='text' placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} className='w-full border p-2 rounded outline-0 border-amber-200' />
      <input type='password' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} className='w-full border p-2 rounded outline-0 border-amber-200' />
      <button type='submit' className='w-full bg-amber-400 text-white py-2 rounded cursor-pointer hover:bg-amber-600' disabled={loading}>
        {loading ? <Loader/> : 'Login'}
      </button>
      <a className='text-sm text-sky-500 underline'>Don't have an account</a> <Link to="/auth/register" className='text-md text-orange-700'>  Register</Link>
    </form>
  )
}
