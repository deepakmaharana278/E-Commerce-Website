import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from "@stripe/react-stripe-js";

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
      return total.toLocaleString("en-US", { style: "currency", currency: "USD" });
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
      localStorage.setItem("cart", JSON.stringify(myCart));
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
                <span className="text-2xl font-bold text-blue-700">Total: {totaPrice()}</span>
              </div>
              <hr className="my-3" />
              {auth?.user?.address ? (
                <div className="mb-3">
                  <h4 className="text-center">Current Address</h4>
                  <h5 className="text-center">{auth?.user?.address}</h5>
                  <button
                    className="bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="bg-blue-700 mt-3 rounded-md text-white font-bold hover:bg-blue-900 py-2 px-3 w-full"
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
                  <PaymentForm cart={cart} setCart={setCart} navigate={navigate} auth={auth} />
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

// PaymentForm Component with Card + Google Pay / UPI
const PaymentForm = ({ cart, setCart, navigate, auth }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [showPRButton, setShowPRButton] = useState(false);

  const totalAmount = cart.reduce((acc, item) => acc + item.price * 100, 0); // in paise

  useEffect(() => {
    if (!stripe) return;

    const pr = stripe.paymentRequest({
      country: "IN",
      currency: "inr",
      total: { label: "Total", amount: totalAmount },
      requestPayerName: true,
      requestPayerEmail: true,
      requestPayerPhone: true,
      paymentMethodTypes: ["card", "upi"],
    });

    pr.canMakePayment().then(result => {
      if (result) setShowPRButton(true);
    });

    pr.on("paymentmethod", async (ev) => {
      setLoading(true);
      try {
        const { data } = await axios.post("/api/v1/product/stripe/create-payment-intent", { cart });
        const clientSecret = data.clientSecret;

        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: ev.paymentMethod.id,
          confirmParams: { return_url: window.location.href },
        });

        if (confirmError) {
          toast.error(confirmError.message);
          ev.complete("fail");
        } else if (paymentIntent.status === "succeeded") {
          await axios.post("/api/v1/product/stripe/payment-success", { cart, paymentIntent });
          localStorage.removeItem("cart");
          setCart([]);
          toast.success("Payment successful!");
          navigate("/dashboard/user/orders");
          ev.complete("success");
        }
      } catch (err) {
        console.log(err);
        toast.error("Payment failed. Try again.");
        ev.complete("fail");
      } finally {
        setLoading(false);
      }
    });

    setPaymentRequest(pr);
  }, [stripe, cart]);

  const handleCardPayment = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    try {
      const { data } = await axios.post("/api/v1/product/stripe/create-payment-intent", { cart });
      const clientSecret = data.clientSecret;
      const cardElement = elements.getElement(CardElement);

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement, billing_details: { name: auth?.user?.name } },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === "succeeded") {
        await axios.post("/api/v1/product/stripe/payment-success", { cart, paymentIntent });
        localStorage.removeItem("cart");
        setCart([]);
        toast.success("Payment successful!");
        navigate("/dashboard/user/orders");
      }
    } catch (err) {
      console.log(err);
      toast.error("Payment failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* PaymentRequestButton (Google Pay / UPI) */}
      {showPRButton && paymentRequest && (
        <div className="mb-4">
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}

      {/* Card Payment Fallback */}
      <div className="mb-4 border p-2 rounded-md">
        <CardElement />
      </div>
      <button
        className="bg-green-600 mt-3 rounded-md text-white font-bold hover:bg-green-800 py-2 px-3 w-full"
        onClick={handleCardPayment}
        disabled={loading}
      >
        {loading ? "Processing..." : "Pay with Card / Other Methods"}
      </button>
    </div>
  );
};
