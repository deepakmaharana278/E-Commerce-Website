import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const Search = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart,setCart] = useCart()

  return (
    <Layout>
      <div className="container mx-auto px-6 py-10 max-w-7xl">
  <div className="text-center mb-12">
    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Search Results</h1>
    <h6 className="text-lg text-gray-600">
      {values?.results.length < 1
        ? "No Products Found"
        : `Found ${values?.results.length} product${values?.results.length > 1 ? "s" : ""}`}
    </h6>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    {values?.results.map((product) => (
      <div
        key={product._id}
        className="bg-white rounded-3xl shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
      >
        <img
          src={`/api/v1/product/product-photo/${product._id}`}
          alt={product.name}
          className="h-52 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="flex flex-col flex-1 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">{product.name}</h2>
          <p className="text-gray-700 mb-4 line-clamp-3">{product.description.substring(0, 100)}...</p>
          <p className="text-indigo-600 font-bold text-lg mb-6">${Number(product.price).toFixed(2)}</p>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full w-full shadow transition"
            onClick={() => navigate(`/product/${product.slug}`)}
          >
            View Details
          </button>
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 rounded-full w-full shadow mt-3 transition"
            onClick={() => {
              setCart([...cart, product]);
              toast.success("Item Added to Cart");
            }}
          >
            Add To Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>

    </Layout>
  );
};

export default Search;
