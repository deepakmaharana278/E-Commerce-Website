import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import UserMenu from '../../components/Layout/UserMenu'
import axios from 'axios';
import { useAuth } from '../../context/auth';
import moment from 'moment'


const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth()

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders")
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (auth?.token) getOrders()
  }, [auth?.token])

  return (
    <Layout>
      <div className="container mx-auto p-6">
  <div className="flex gap-8">
    {/* Sidebar User Menu */}
    <div className="w-64">
      <UserMenu />
    </div>

    {/* Main Content */}
    <div className="flex-1">
      <h1 className="font-extrabold text-center text-2xl mb-6">All Orders</h1>

      {/* Orders Table */}
      <div className="overflow-x-auto mb-10">
        <table className="min-w-full border border-gray-300 rounded-lg divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">#</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Status</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Buyer</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Date</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Payment</th>
              <th className="py-3 px-6 text-left text-xs font-medium text-gray-600 uppercase">Quantity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders?.map((o, i) => (
              <tr key={o._id} className="hover:bg-gray-50">
                <td className="py-3 px-6 whitespace-nowrap">{i + 1}</td>
                <td className="py-3 px-6 whitespace-nowrap">{o?.status}</td>
                <td className="py-3 px-6 whitespace-nowrap">{o?.buyer?.name}</td>
                <td className="py-3 px-6 whitespace-nowrap">{moment(o?.createAt).fromNow()}</td>
                <td className="py-3 px-6 whitespace-nowrap">
                  {o?.payment?.status
                    ? o.payment.status === "succeeded"
                      ? <span className="text-green-600 font-semibold">Success</span>
                      : <span className="text-red-600 font-semibold">Failed</span>
                    : <span className="text-gray-500 font-semibold">Pending</span>}
                </td>
                <td className="py-3 px-6 whitespace-nowrap">{o?.products?.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Products for All Orders */}
      <div className="space-y-10">
        {orders.map((o) =>
          o.products.map((p) => (
            <div
              key={p._id}
              className="flex flex-col sm:flex-row items-center bg-white shadow rounded-xl overflow-hidden"
            >
              <img
                src={`/api/v1/product/product-photo/${p._id}`}
                alt={p.name}
                className="h-36 w-full sm:w-36 object-cover rounded-lg"
              />
              <div className="flex-1 sm:ml-4 p-4 text-left">
                <p className="text-lg font-semibold text-gray-900">{p.name}</p>
                <p className="text-gray-600 mb-1 truncate">{p.description}</p>
                <p className="text-green-600 font-bold">Price: ${p.price}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default Orders