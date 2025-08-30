import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container mx-auto">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>{values?.results.length < 1 ? "No Products Found" : `Found${values?.results.length}`}</h6>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-4 gap-6">
            {values?.results.map((product) => (
              <div key={product._id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col">
                <img src={`/api/v1/product/product-photo/${product._id}`} alt={product.name} className="h-48 w-full object-cover" />
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-base font-semibold text-gray-800 mb-1">{product.name}</h2>
                  <p className="text-gray-600 mb-2">{product.description.substring(0, 60)}...</p>
                  <p className="text-gray-600 mb-4 font-semibold">${Number(product.price).toFixed(2)}</p>
                  <button className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded w-full mt-auto transition"
                  onClick={() => navigate(`/product/${product.slug}`)}
                  >View Details</button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded w-full mt-2">Add To Cart</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
