import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          <div className="w-64">
            <AdminMenu />
          </div>
          <div className="flex-1">
            <h1 className="text-center font-extrabold text-2xl">All Products List</h1>
            <div className="flex flex-wrap">
              {products?.map((p) => (
                <Link key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
                  <div className="bg-white shadow rounded-lg overflow-hidden w-72 m-4 flex flex-col">
                    <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
                      <img src={`/api/v1/product/product-photo/${p._id}`} alt={p.name} className="h-full w-full object-contain" />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h2 className="text-lg font-bold mb-1">{p.name}</h2>
                      <p className="text-gray-600 mb-4">{p.description}</p>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded w-full">View Details</button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
