import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios';
import toast from 'react-hot-toast';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState(null)
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();


  // total price
  const totaPrice = () => {
    try {
      let total = 0
      cart?.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      })
    } catch (error) {
      console.log(error);

    }
  }

  // delete item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart]
      let index = myCart.findIndex(item => item._id === pid)
      myCart.splice(index, 1)
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);

    }
  }

  // get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token")
      setClientToken(data?.clientToken)
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getToken()
  }, [auth?.token])

  // handle payment
  const handlePayment = async () => {
    try {
      setLoading(true)
      const { nonce } = await instance.requestPaymentMethod()
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce, cart
      })
      setLoading(false)
      localStorage.removeItem("cart")
      setCart([])
      if (data?.success) {
        navigate("/dashboard/user/orders")
        toast.success("Payment successful");
      } else {
        toast.error("Payment failed");
      }
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  };


  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* User Greeting and Cart Status */}
        <div className="text-center mb-8">
          <h1 className="font-bold text-lg">
            {`Hello${ auth?.token && auth?.user?.name ? ` ${ auth.user.name }` : "" }`}
          </h1>
          <p className="font-medium text-gray-700">
            {cart?.length
              ? `You have ${ cart.length } item${ cart.length > 1 ? "s" : "" } in your cart${ auth?.token ? "" : " (please login to checkout)" }`
              : "Your cart is empty"}
          </p>
        </div>
        {/* Main Cart Area */}
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1">
            {cart?.length > 0 ? (
              <div className="space-y-6">
                {cart.map((p) => (
                  <div key={p._id} className="flex bg-white shadow rounded-xl overflow-hidden flex-col sm:flex-row items-center gap-6 p-4">
                    <img
                      src={`/api/v1/product/product-photo/${ p._id }`}
                      alt={p.name}
                      className="h-36 w-36 object-cover rounded-lg"
                    />
                    <div className="flex-1 text-left">
                      <p className="text-lg font-semibold text-gray-900">{p.name}</p>
                      <p className="text-gray-600 mb-1">{p.description.substring(0, 60)}...</p>
                      <p className="text-green-600 font-bold mb-2">Price: ${p.price}</p>
                      <button
                        className="bg-red-600 hover:bg-red-800 text-white font-bold py-1 px-4 rounded-md transition"
                        onClick={() => removeCartItem(p._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-lg text-gray-400">No products in your cart.</div>
            )}
          </div>
          {/* Cart Summary */}
          <div className="w-full max-w-xs mx-auto lg:mx-0">
            <div className="bg-white shadow rounded-xl p-6 sticky top-28">
              <h1 className="text-center font-extrabold text-xl mb-4">Cart Summary</h1>
              <div className="flex flex-col items-center gap-2 mb-4">
                <span className="text-gray-700 font-medium">Total Items: {cart.length}</span>
                <span className="text-2xl font-bold text-blue-700">
                  Total: {totaPrice()}
                </span>
              </div>
              <hr className="my-3" />
              {auth?.user?.address ? (
                <>
                  <div className='mb-3'>
                    <h4 className='text-center'>Current Address</h4>
                    <h5 className='text-center'>{auth?.user?.address}</h5>
                    <button
                      className='bg-blue-700 mt-3 rounded-md  text-white font-bold hover:bg-blue-900 py-2 px-3 w-full'
                      onClick={() => navigate("/dashboard/user/profile")}
                    >Update Address</button>
                  </div>
                </>
              ) : (
                <div className='mb-3'>
                  {
                    auth?.token ? (
                      <button
                        className='bg-blue-700 mt-3 rounded-md  text-white font-bold hover:bg-blue-900 py-2 px-3 w-full'
                        onClick={() => navigate("/dashboard/user/profile")}
                      >Update Address</button>
                    ) : (
                      <button className='bg-blue-700 mt-3 rounded-md  text-white font-bold hover:bg-blue-900 py-2 px-3 w-full'
                        onClick={() => navigate("/login", {
                          state: "/cart",
                        })}
                      >Please login to checkout</button>
                    )
                  }
                </div>
              )}
              {clientToken && cart?.length > 0 && (
                <div className="mt-2">
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "checkout" },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full"
                    onClick={handlePayment}
                    disabled={loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>

  )
}

export default CartPage