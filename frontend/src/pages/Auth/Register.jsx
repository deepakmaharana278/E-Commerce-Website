import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from 'axios';


const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate(); 
  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/register`,
        { name, email, password, phone, address, answer }
      );
      if (res.data && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };



  return (
    <Layout>
      <div className="flex flex-col items-center justify-center px-4 py-10 ">
      <div className="w-full max-w-md bg-gray-200 shadow-xl ring-1 ring-gray-200
 rounded-lg p-6">

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create an Account
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              placeholder="Enter your Name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
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

          {/* Phone No.*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your Phone"
              className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            </div>
            
          {/* Address*/}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your Address"
              className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black transition"
              required
            />
            </div>
            {/* Answer */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              placeholder="What is your Favorite sports ?"
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
            Register
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
    </Layout>
    
  );
};

export default Register;
