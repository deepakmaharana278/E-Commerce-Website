import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked,setChecked] = useState([])
  const [radio,setRadio] = useState([])

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
  }

  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked]
    if (value) {
      all.push(id)
    } else {
      all = all.filter((c) => c !== id)
    }
    setChecked(all);
  };


  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length,radio.length])
  
  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  },[checked,radio])

  // get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error); 
    }
  }

  return (
    <Layout>
      <div className="flex flex-row mt-3">
        <div className="w-1/6">
          <h4 className="text-center font-extrabold">Filter By Category</h4>
          <div className="flex flex-col">
            {categories?.map(c => (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked,c._id)}>
              {c.name}
            </Checkbox>
              
            ))}
          </div>
          {/* Price Filter */}
          <h4 className="text-center font-extrabold mt-4">Filter By Price</h4>
          <div className="flex flex-col">
            <Radio.Group onChange={e => setRadio(e.target.value)}>
              {Prices?.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
        </div>
        <div className="w-3/4">
          {JSON.stringify(radio,null,4)}
          <h1 className="text-center font-extrabold">All Products</h1>
          <div className="flex flex-wrap">
            {products?.map((p) => (
                  <div key={p._id} className="bg-white shadow rounded-lg overflow-hidden w-72 m-4 flex flex-col">
                    <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                      <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="text-lg font-bold mb-1">{p.name}</h2>
                      <p className="text-gray-600 mb-4">{p.description.substring(0,30)}</p>
                      <p className="text-gray-600 mb-4">$ {p.price}</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full ">View Details</button>
                      <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded mt-2">Add To Cart</button>
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
