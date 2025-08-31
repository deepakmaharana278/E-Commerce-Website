import React from 'react'
import Layout from '../components/Layout/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate()


  // total price
  const totaPrice = () => {
    try {
      let total = 0
      cart?.map((item) => {
        total = total + item.price
      })
      return total.toLocaleString("en-US", {
        style: "currency",
        currency:"USD"
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

  return (
    <Layout>
  <div className="max-w-5xl mx-auto px-4 py-8">
    {/* User Greeting and Cart Status */}
    <div className="text-center mb-8">
      <h1 className="font-bold text-lg">
        {`Hello${auth?.token && auth?.user?.name ? ` ${auth.user.name}` : ""}`}
      </h1>
      <p className="font-medium text-gray-700">
        {cart?.length
          ? `You have ${cart.length} item${cart.length > 1 ? "s" : ""} in your cart${auth?.token ? "" : " (please login to checkout)"}`
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
                  src={`/api/v1/product/product-photo/${p._id}`}
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
          <button
            className={`w-full py-3 rounded-lg font-semibold transition ${
              cart.length === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
            disabled={cart.length === 0 || !auth?.token}
            // Add your checkout function here
          >
            {auth?.token ? "Checkout" : "Login to Checkout"}
          </button>
        </div>
      </div>
    </div>
  </div>
</Layout>

  )
}

export default CartPage