import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Loader from "../components/Loader";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("please fill in all fields!", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`, {
        username,
        password,
      });
      console.log("data", response.data);
      if (response.status === 201) {
        toast.success("User has Registered Successfully!", {
          position: "top-center",
        });
        setTimeout(() => navigate("/auth/login"), 2000);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed. Please try again.",
        { position: "top-center" }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleRegister}
      className="bg-white p-8 rounded shadow-md w-80 space-y-4"
    >
      <h2 className="text-2xl font-bold text-center">Register</h2>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded outline-0 border-amber-200"
      />
      <input
        type="text"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded outline-0 border-amber-200"
      />
      <button
        type="submit"
        className="w-full bg-amber-400 text-white py-2 rounded hover:bg-amber-600 cursor-pointer"
        disabled={loading}
      >
        {loading ? <Loader/> : "Register"}
      </button>
      <a className="text-sm text-sky-500 underline">Already have an account</a>{" "}
      <Link to="/auth/login" className="text-md text-orange-700">
        Login
      </Link>
    </form>
  );
}
