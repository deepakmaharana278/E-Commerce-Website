import React from 'react'
import Layout from '../components/Layout/Layout'

const Contact = () => {
  return (
      <Layout>
       <div className="min-h-screen flex flex-col items-center px-6 py-10">
      
      {/* Page heading */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-gray-600 max-w-xl text-center mb-8">
        Have a question, feedback, or need support?  
        Fill out the form below and we’ll get back to you as soon as possible.
      </p>

      {/* Contact form */}
      <form className="bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-5">
        
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Message
          </label>
          <textarea
            rows="5"
            placeholder="Write your message..."
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300"
        >
          Send Message
        </button>
      </form>

      {/* Optional contact info */}
      <div className="mt-10 text-gray-600 text-sm text-center">
        You can also reach us at:  
        <br />
        <span className="font-medium">support@ecommerceapp.com</span>  
        <br />
        <span>+1 (123) 456‑7890</span>
      </div>
    </div>
    </Layout>
  )
}

export default Contact