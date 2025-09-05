import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Clock } from "lucide-react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className="container mx-auto p-6">
        <div className="flex gap-8">
          {/* Sidebar User Menu */}
          <div className="w-64 hidden lg:block">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <h1 className="font-extrabold text-center text-3xl mb-8 text-gray-800">
              My Orders
            </h1>

            <div className="space-y-6">
              {orders.map((o, index) => (
                <div
                  key={o._id}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
                >
                  {/* Order Summary Header */}
                  <div
                    className="flex justify-between items-center p-5 cursor-pointer hover:bg-gray-50 transition"
                    onClick={() =>
                      setExpandedOrder(expandedOrder === o._id ? null : o._id)
                    }
                  >
                    <div className="flex items-center gap-6">
                      <span className="text-lg font-bold text-gray-700">
                        #{index + 1}
                      </span>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {o?.buyer?.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {moment(o?.createdAt).format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Status Badge */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1
                          ${ o?.status === "Delivered"
                            ? "bg-green-100 text-green-700"
                            : o?.status === "Processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {o?.status === "Delivered" && <CheckCircle size={16} />}
                        {o?.status === "Processing" && <Clock size={16} />}
                        {o?.status !== "Delivered" &&
                          o?.status !== "Processing" && <XCircle size={16} />}
                        {o?.status}
                      </span>

                      {/* Payment Status */}
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold
                          ${ o?.payment?.status === "succeeded"
                            ? "bg-green-100 text-green-700"
                            : o?.payment?.status === "failed"
                              ? "bg-red-100 text-red-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                      >
                        {o?.payment?.status === "succeeded"
                          ? "Paid"
                          : o?.payment?.status === "failed"
                            ? "Failed"
                            : "Pending"}
                      </span>

                      {/* Expand/Collapse */}
                      {expandedOrder === o._id ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </div>
                  </div>

                  {/* Expanded Product Details */}
                  {expandedOrder === o._id && (
                    <div className="border-t border-gray-200 bg-gray-50 p-5 space-y-4">
                      {o.products.map((p) => (
                        <div
                          key={p._id}
                          className="flex flex-col sm:flex-row items-center bg-white border rounded-xl p-4 shadow-sm"
                        >
                          <img
                            src={`/api/v1/product/product-photo/${ p._id }`}
                            alt={p.name}
                            className="h-28 w-28 object-cover rounded-lg"
                          />
                          <div className="flex-1 sm:ml-4 mt-3 sm:mt-0 text-left">
                            <p className="text-lg font-semibold text-gray-900">
                              {p.name}
                            </p>
                            <p className="text-gray-600 text-sm mb-2">
                              {p.description}
                            </p>
                            <p className="text-green-600 font-bold">
                              ₹ {p.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {orders.length === 0 && (
                <p className="text-center text-gray-500 text-lg">
                  No orders found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
