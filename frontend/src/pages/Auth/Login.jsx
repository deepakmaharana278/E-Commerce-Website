import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  // form function
  const handleSubmit = async (e) => {
  e.preventDefault();
  const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/login`, { email, password });
  if (res.data?.success) {
  setAuth({ user: res.data.user, token: res.data.token });
  localStorage.setItem("auth", JSON.stringify({ user: res.data.user, token: res.data.token }));
  toast.success(res.data.message);

  // Redirect based on role
  if (res.data.user.role === 1) {
    navigate("/dashboard/admin"); // Admin
  } else {
    navigate("/dashboard/user"); // Normal user
  }
} else {
  toast.error(res.data.message);
}

};


  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="mt-4 w-full max-w-md  bg-gray-200 shadow-xl ring-1 ring-gray-200 rounded-lg p-6">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login to Your Account</h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black transition"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md 
                       hover:bg-gray-800 transition-colors duration-300"
            >
              Login
            </button>
            
          </form>
          
          <button type="button" className="ml-4 font-semibold text-[13px] text-black" onClick={()=>{navigate('/forgot-password')}}>
            Forgot Password?
          </button>

          {/* Link to register */}
          <p className="mt-4 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-black font-medium hover:underline">
              Register
            </Link>
          </p>
          
        </div>
      </div>
    </Layout>
  );
};

export default Login;
