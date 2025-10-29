import React from "react";
import CartItem from "./CartItem";

function Cart({
  cart,
  name,
  email,
  setName,
  setEmail,
  onRemoveFromCart,
  onUpdateQuantity,
  onCheckout,
}) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">My Cart</h2>
        <>
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {cart.cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              cart.cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemoveFromCart={onRemoveFromCart}
                />
              ))
            )}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-xl font-semibold text-gray-800">
              <span>Total:</span>
              <span>${cart.total.toFixed(2)}</span>
            </div>
          </div>

          <form onSubmit={onCheckout} className="mt-6 border-t pt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Checkout
            </h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={cart.cartItems.length === 0}
              className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Complete Purchase
            </button>
          </form>
        </>
      </div>
    </div>
  );
}

export default Cart;
