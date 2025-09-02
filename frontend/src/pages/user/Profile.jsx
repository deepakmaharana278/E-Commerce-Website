import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");


  // get user data
  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name)
    setPhone(phone)
    setEmail(email)
    setAddress(address)
  }, [auth?.user])

  // form handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        "/api/v1/auth/profile",
        { name, email, password, phone, address }
      );
      if (data?.error) {
        toast.error(data?.error)
      } else {
        setAuth({ ...auth, user: data?.updatedUser })
        let ls = localStorage.getItem("auth")
        ls = JSON.parse(ls)
        ls.user = data.updatedUser
        localStorage.setItem("auth", JSON.stringify(ls))
        toast.success("Profile updated successfully")
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex p-6">
        {/* Sidebar User Menu */}
        <aside className="w-64 bg-white rounded-3xl shadow-2xl ring-1 ring-indigo-300 p-6 mr-8">
          <UserMenu />
        </aside>

        {/* Profile Content */}
        <main className="flex-1 bg-white rounded-3xl shadow-2xl ring-1 ring-indigo-300 p-10">
          {/* Avatar and Heading */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-24 w-24 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 text-6xl font-extrabold select-none">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h1 className="mt-5 text-4xl font-extrabold text-gray-900">
              User Profile
            </h1>
            <p className="mt-1 text-gray-600 text-center max-w-xs">
              Update your personal information below.
            </p>
          </div>

          {/* Profile Update Form */}
          <form onSubmit={handleSubmit} className="space-y-7 max-w-lg mx-auto">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your Name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-500 bg-gray-100 cursor-not-allowed"
                required
                disabled
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
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your Phone"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your Address"
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold text-lg shadow-lg transition duration-300"
            >
              Update
            </button>
          </form>
        </main>
      </div>



    </Layout>
  )
}

export default Profile