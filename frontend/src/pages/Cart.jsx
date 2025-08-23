import React from "react";
import Layout from "../components/Layout/Layout";

const Cart = () => {
  const cartItems = [
    { id: 1, name: "Product 1", price: 25.0, quantity: 2, image: "https://via.placeholder.com/100" },
    { id: 2, name: "Product 2", price: 40.0, quantity: 1, image: "https://via.placeholder.com/100" },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <Layout>
            <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                </div>

                {/* Quantity + Total */}
                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    defaultValue={item.quantity}
                    min="1"
                    className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <p className="text-gray-800 font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="border p-4 rounded-lg shadow-md bg-white h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 mb-4">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between font-semibold text-lg mb-6">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
      </Layout>
    
  );
};

export default Cart;
