import React from "react";

function CartItem({ item, onUpdateQuantity, onRemoveFromCart }) {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={item.product.imageUrl}
          alt={item.product.name}
          className="w-12 h-12 object-cover rounded-md mr-3"
        />
        <div>
          <h4 className="font-semibold text-gray-800">{item.product.name}</h4>
          <p className="text-sm text-gray-600">
            ${item.product.price.toFixed(2)}
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onUpdateQuantity(item._id, "decrement")}
          className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full hover:bg-gray-300"
        >
          -
        </button>
        <span className="font-semibold text-gray-800 w-4 text-center">
          {item.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(item._id, "increment")}
          className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full hover:bg-gray-300"
        >
          +
        </button>
        <button
          onClick={() => onRemoveFromCart(item._id)}
          className="text-red-500 hover:text-red-700 ml-2"
        >
          &times;
        </button>
      </div>
    </div>
  );
}

export default CartItem;
