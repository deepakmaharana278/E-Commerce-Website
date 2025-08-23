import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout/Layout";

const Pagenotfound = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center  bg-gray-50 px-6 text-center ">
      
      {/* Error Code */}
      <h1 className="text-9xl font-bold text-gray-800">404</h1>

      {/* Message */}
      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Page not found
      </h2>
      <p className="mt-2 text-gray-500 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="mt-6 inline-block px-6 py-3 text-white bg-black rounded-md hover:bg-gray-800 transition-colors duration-300"
      >
        Go Back Home
      </Link>
    </div>
    </Layout>
  );
};

export default Pagenotfound;
