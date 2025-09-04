import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";


const {Option} = Select

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled"
    ]);
  const [changeStatus, SetChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
    
    const handleChange = async (orderId,value) => {
        try {
            const { data } = await axios.put(`/api/v1/auth/order-status/${ orderId }`, { status: value })
            getOrders();
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <Layout>
      <div className="container mx-auto p-6">
  <div className="flex gap-8">
    {/* Sidebar */}
    <div className="w-64">
      <AdminMenu />
    </div>

    {/* Main Content */}
    <div className="flex-1">
      <h1 className="font-extrabold text-center text-3xl mb-8">All Orders</h1>
      <div className="overflow-x-auto mb-12">
        <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200 shadow-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">#</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Buyer</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment</th>
              <th className="py-3 px-6 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((o, i) => (
              <React.Fragment key={o._id}>
                {/* Order Summary Row */}
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 whitespace-nowrap text-gray-900 font-medium">{i + 1}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <Select 
                       bordered={false} 
                       onChange={(value) => handleChange(o._id,value)} defaultValue={o?.status}>
                                {status.map((s, i) => (
                            <Option key={i} value={s}>{s}</Option>
                        ))}
                    </Select>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-gray-700">{o?.buyer?.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap text-gray-600">{moment(o?.createdAt).fromNow()}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {o?.payment?.status === "succeeded" ? (
                      <span className="text-green-600 font-semibold">Success</span>
                    ) : (
                      <span className="text-red-600 font-semibold">Failed</span>
                    )}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap text-gray-700">{o?.products?.length}</td>
                </tr>

                {/* Products Row */}
                <tr>
                  <td colSpan={6} className="bg-gray-50 py-6 px-6">
                    <div className="flex flex-wrap gap-6 justify-start">
                      {o.products.map((p) => (
                        <div key={p._id} className="bg-white rounded-lg shadow p-4 w-40 flex flex-col items-center">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            className="h-24 w-24 object-cover rounded-md mb-3"
                          />
                          <p className="text-gray-900 font-semibold text-center mb-1 truncate">{p.name}</p>
                          <p className="text-gray-600 text-sm text-center mb-2 truncate">{p.description}</p>
                          <span className="text-green-600 font-bold">Price: ${p.price}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    </Layout>
  );
};

export default AdminOrders;
