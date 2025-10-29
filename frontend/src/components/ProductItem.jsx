import React from "react";

function ProductItem({
  product,
  cartItem,
  onAddToCart,
  onUpdateQuantity,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden relative">
      <div className="absolute top-2 right-2 z-10 flex space-x-2">
        <button
          onClick={onEdit}
          className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Edit product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={onDelete}
          className="bg-white p-1.5 rounded-full shadow-md hover:bg-gray-100 transition"
          aria-label="Delete product"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

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
