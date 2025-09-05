import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import { useSearch } from "../context/search";

const HomePage = () => {
  const [cart,setCart] = useCart([])
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); 
  const [values, setValues] = useSearch()
  const navigate = useNavigate();

  // get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // get Total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // load more
  const loadMore = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`/api/v1/product/search/${ values.keyword }`)
            setValues({ ...values, results: data })
            navigate("/search");
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
  {/* Hero Section */}
  <section className="relative py-16 px-4 sm:px-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-100 to-pink-50 shadow-2xl mb-12 overflow-hidden flex flex-col items-center text-center">
    <h1 className="text-5xl sm:text-6xl font-extrabold text-indigo-700 mb-4 drop-shadow-xl leading-tight">
      Explore New Arrivals <br className="hidden sm:block" />& Top Trends!
    </h1>
    <p className="text-lg sm:text-xl text-gray-600 mb-8 opacity-80 max-w-2xl mx-auto">
      The best products, curated for you. Find what you love, filter fast, shop smarter.
    </p>
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 w-full max-w-xl mx-auto"
    >
      <input
        type="text"
        placeholder="What are you shopping for?"
        className="flex-1 px-6 py-4 rounded-full border border-gray-300 bg-white shadow focus:outline-none focus:ring-2 focus:ring-indigo-400 text-lg"
        value={values.keyword}
        onChange={e => setValues({ ...values, keyword: e.target.value })}
      />
      <button
        className="bg-gradient-to-r from-indigo-600 to-pink-500 hover:from-indigo-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full shadow-lg text-lg transition"
        type="submit"
      >
        Search
      </button>
    </form>
  </section>

  {/* Main Content: Filters & Products */}
  <div className="flex flex-col md:flex-row gap-12">
    {/* Sidebar Filters */}
    <aside className={`w-full md:w-1/4 ${showFilters ? "block" : "hidden"} md:block transition-all duration-300`}>
      <div className="bg-white shadow-2xl rounded-3xl border border-indigo-100 p-8 sticky top-28">
        <div className="flex items-center gap-2 mb-6">
          <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M4 6h16M4 12h8m-8 6h16"></path>
          </svg>
          <span className="font-bold text-xl text-indigo-700">Filter Products</span>
        </div>
        <div className="mb-10">
          <h3 className="font-semibold text-gray-600 mb-3 uppercase tracking-wider">Category</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c._id}
                onClick={() => handleFilter(!checked.includes(c._id), c._id)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition
                  ${checked.includes(c._id) ? "bg-indigo-100 text-indigo-600 border-indigo-400" : "bg-gray-50 text-gray-600 hover:border-indigo-200"}
                `}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-10">
          <h3 className="font-semibold text-gray-600 mb-3 uppercase tracking-wider">Price Range</h3>
          <div className="flex flex-wrap gap-2">
            {Prices.map((p) => (
              <button
                key={p._id}
                onClick={() => setRadio(p.array)}
                className={`px-4 py-2 rounded-full border text-sm font-semibold transition
                  ${radio === p.array ? "bg-pink-100 text-pink-700 border-pink-400" : "bg-gray-50 text-gray-600 hover:border-pink-200"}
                `}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="w-full py-3 bg-red-500 hover:bg-red-700 text-white font-bold rounded-full mt-2 shadow transition"
        >
          Reset Filters
        </button>
      </div>
    </aside>

    {/* Products Grid */}
    <main className="flex-1">
      <h2 className="text-center font-extrabold text-3xl md:text-4xl mb-8 tracking-tight text-indigo-700">
        All Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col group transition transform hover:-translate-y-2 hover:shadow-2xl"
          >
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt={product.name}
              className="h-56 w-full object-cover group-hover:scale-105 transition"
            />
            <div className="p-6 flex flex-col flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description.substring(0, 60)}...</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-pink-600">${Number(product.price).toFixed(2)}</span>
              </div>
              <button
                className="mb-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-full w-full shadow transition"
                onClick={() => navigate(`/product/${product.slug}`)}
              >
                View Details
              </button>
              <button
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold py-3 rounded-full w-full shadow transition"
                onClick={() => {
                  setCart([...cart, product]);
                  localStorage.setItem('cart', JSON.stringify([...cart, product]));
                  toast.success("Item Added to Cart");
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      <div className="mt-10 text-center">
        {products && products.length < total && (
          <button
            className="bg-gradient-to-r from-indigo-400 to-pink-500 hover:from-indigo-600 hover:to-pink-700 text-white font-bold py-4 px-10 rounded-3xl shadow-xl transition"
            onClick={(e) => {
              e.preventDefault();
              setPage(page + 1);
            }}
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        )}
      </div>
    </main>
  </div>
</Layout>

  );
};

export default HomePage;
