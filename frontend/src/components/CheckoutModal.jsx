import React from "react";

function CheckoutModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-green-600">
            Checkout Successful!
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <p>
            <span className="font-semibold">Receipt ID:</span>{" "}
            {receipt.receiptId}
          </p>
          <p>
            <span className="font-semibold">Date:</span>{" "}
            {new Date(receipt.timestamp).toLocaleString()}
          </p>

          <div className="border-t border-b py-4 my-4">
            <h3 className="text-lg font-semibold mb-2">Items Purchased:</h3>
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {receipt.items.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>
                    {item.name} (x{item.quantity})
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-xl font-bold text-right">
            Total Paid: ${receipt.total.toFixed(2)}
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CheckoutModal;
