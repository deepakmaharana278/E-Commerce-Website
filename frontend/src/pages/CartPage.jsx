import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import { useCart } from '../context/cart';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

// Load Stripe with your publishable key
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);


const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totaPrice = () => {
    try {
      let total = 0;
      cart?.forEach(item => total += item.price);
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD"
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = [...cart];
      const index = myCart.findIndex(item => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem('cart', JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* User Greeting */}
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
                      src={p.photo}
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
                <div className='mb-3'>
                  <h4 className='text-center'>Current Address</h4>
                  <h5 className='text-center'>{auth?.user?.address}</h5>
                  <button
                    className='bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full'
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className='mb-3'>
                  {auth?.token ? (
                    <button
                      className='bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full'
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className='bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full'
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Please login to checkout
                    </button>
                  )}
                </div>
              )}

              {/* Stripe Payment */}
              {cart?.length > 0 && auth?.user?.address && (
                <Elements stripe={stripePromise}>
                  <PaymentForm cart={cart} setCart={setCart} navigate={navigate} />
                </Elements>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

// ----------------------
// PaymentForm Component
// ----------------------
const PaymentForm = ({ cart, setCart, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/product/stripe/create-payment-intent", { cart });
      const clientSecret = data?.clientSecret;

      if (!clientSecret) {
        toast.error("Payment failed. Try again.");
        setLoading(false);
        return;
      }

      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement }
      });

      if (error) {
        toast.error(error.message);
        setLoading(false);
      } else if (paymentIntent?.status === "succeeded") {
        await axios.post("/api/v1/product/stripe/payment-success", { cart, paymentIntent });
        localStorage.removeItem("cart");
        setCart([]);
        setLoading(false);
        toast.success("Payment successful!");
        navigate("/dashboard/user/orders");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div>
      <CardElement className="p-2 border rounded-md mb-4" />
      <button
        className="bg-gradient-to-r from-green-500 to-green-700 mt-4 rounded-lg text-white font-semibold hover:from-green-700 hover:to-green-900 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300 ease-in-out py-3 px-6 w-full shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3 transform hover:scale-105 active:scale-95"
        onClick={handlePayment}
        disabled={loading}
      >
        {loading && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            ></path>
          </svg>
        )}
        <span>{loading ? "Processing..." : "Pay with Stripe"}</span>
      </button>

    </div>
  );
};
