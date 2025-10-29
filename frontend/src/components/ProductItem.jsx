import React from "react";

function ProductItem({ product, cartItem, onAddToCart, onUpdateQuantity }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-1">${product.price.toFixed(2)}</p>

        <div className="mt-4">
          {cartItem ? (
            // If in cart, show quantity controls
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => onUpdateQuantity(cartItem._id, "decrement")}
                className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full font-bold hover:bg-gray-300 transition duration-300"
              >
                -
              </button>
              <span className="font-semibold text-lg text-gray-800">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(cartItem._id, "increment")}
                className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full font-bold hover:bg-gray-300 transition duration-300"
              >
                +
              </button>
            </div>
          ) : (
            // If not in cart, show "Add to Cart" button
            <button
              onClick={() => onAddToCart(product._id)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
