import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

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
  }, []);

  // get products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
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
      const { data } = await axios.post("/api/v1/product/product-filters", { checked, radio });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="flex mt-6 space-x-8 px-4">
        {/* Filters Sidebar */}
        <div className="w-1/6 border-r pr-4">
          <h3 className="text-center font-bold mb-6 text-lg">Filter By Category</h3>
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

          <h3 className="text-center font-bold mt-10 mb-6 text-lg">Filter By Price</h3>
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
            className="mt-8 bg-red-600 hover:bg-red-700 text-white py-2 rounded w-full font-semibold"
          >
            Reset Filter
          </button>
        </div>

        {/* Products Grid */}
        <div className="w-5/6">
          <h1 className="text-center font-extrabold text-3xl mb-10">All Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow rounded-lg overflow-hidden flex flex-col"
              >
                <img
                  src={`/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-1">
                  <h2 className="text-base font-semibold text-gray-800 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-gray-600 mb-2">{product.description.substring(0, 60)}...</p>
                  <p className="text-gray-600 mb-4 font-semibold">
                    ${Number(product.price).toFixed(2)}
                  </p>
                  <button className="bg-black hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded w-full mt-auto transition">
                    View Details
                  </button>
                  <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded w-full mt-2">
                    Add To Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
