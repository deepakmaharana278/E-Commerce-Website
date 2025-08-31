import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [cart,setCart] = useCart([])
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false); // for mobile toggle
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

  return (
    <Layout>
      <div className="mt-4 px-2 sm:px-4">
        {/* Mobile Filter Toggle */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-lg font-bold">Filters</h2>
          <button
            className="bg-gray-800 text-white px-3 py-1 rounded-md"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Close" : "Open"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } md:block md:w-1/5 border-r pr-4`}
          >
            <h3 className="text-center font-bold mb-4 text-base">
              Filter By Category
            </h3>
            <div className="flex flex-col space-y-2">
              {categories.map((c) => (
                <Checkbox
                  key={c._id}
                  onChange={(e) => handleFilter(e.target.checked, c._id)}
                >
                  {c.name}
                </Checkbox>
              ))}
            </div>

            <h3 className="text-center font-bold mt-6 mb-4 text-base">
              Filter By Price
            </h3>
            <Radio.Group
              className="flex flex-col space-y-2"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices.map((p) => (
                <Radio key={p._id} value={p.array}>
                  {p.name}
                </Radio>
              ))}
            </Radio.Group>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 rounded w-full font-semibold"
            >
              Reset Filter
            </button>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <h1 className="text-center font-extrabold text-2xl md:text-3xl mb-6">
              All Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
                >
                  <img
                    src={`/api/v1/product/product-photo/${product._id}`}
                    alt={product.name}
                    className="h-40 sm:h-48 w-full object-cover"
                  />
                  <div className="p-3 sm:p-4 flex flex-col flex-1">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 mb-1">
                      {product.name}
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      {product.description.substring(0, 60)}...
                    </p>
                    <p className="text-gray-800 font-bold mb-3">
                      ${Number(product.price).toFixed(2)}
                    </p>
                    <button
                      className="bg-black hover:bg-gray-900 text-white text-sm sm:text-base font-semibold py-2 px-3 sm:px-4 rounded w-full mt-auto"
                      onClick={() => navigate(`/product/${product.slug}`)}
                    >
                      View Details
                    </button>
                    <button
                      className="bg-gray-500 hover:bg-gray-600 text-white text-sm sm:text-base font-semibold py-2 px-3 sm:px-4 rounded w-full mt-2"
                      onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem('cart',JSON.stringify([...cart,product]))
                        toast.success("Item Added to Cart")
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            <div className="mt-6 text-center">
              {products && products.length < total && (
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
