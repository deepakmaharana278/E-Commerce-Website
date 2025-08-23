import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [answer, setAnswer] = useState("");
 

  const navigate = useNavigate();
  
  // form function
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post(`${import.meta.env.VITE_API}/api/v1/auth/forgot-password`, {
            email,
            newPassword,
            answer
        });
          if (res && res.data.success) {
              toast.success(res.data && res.data.message);
              navigate('/login')
          } else {
              toast.error(res.data.message);
          }
      } catch (error) {
        console.log(error);
          toast.error('Something went wrong');
      }
  
};
  return (
      <Layout>
          <div className="flex flex-col items-center justify-center px-4 py-10">
        <div className="mt-4 w-full max-w-md  bg-gray-200 shadow-xl ring-1 ring-gray-200 rounded-lg p-6">
          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Reset Password</h1>

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
            {/* Answer */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your favorite sport name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-black transition"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter your new password"
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
              Reset
            </button>
            
          </form>
          
          
          
        </div>
      </div>
    </Layout>
  )
}

export default ForgotPassword