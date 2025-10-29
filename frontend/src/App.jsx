import { useState, useEffect } from "react";
import axios from "axios";
import CheckoutModal from "./components/CheckoutModal";
import AddProductModal from "./components/AddProductModal";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ cartItems: [], total: 0 });
  const [loading, setLoading] = useState(true);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Modal states
  const [receipt, setReceipt] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // --- DATA FETCHING ---

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const { data } = await axios.get("/api/cart");
      setCart(data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await fetchProducts();
      await fetchCart();
      setLoading(false);
    };
    loadData();
  }, []);

  // --- CART ACTIONS ---

  const handleAddToCart = async (productId) => {
    try {
      const { data } = await axios.post("/api/cart", {
        productId,
        quantity: 1,
      });
      setCart(data);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      const { data } = await axios.delete(`/api/cart/${cartItemId}`);
      setCart(data);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const handleUpdateQuantity = async (cartItemId, action) => {
    try {
      const { data } = await axios.put(`/api/cart/${cartItemId}`, { action });
      setCart(data);
    } catch (error) {
      console.error(`Error updating quantity: ${error}`);
    }
  };

  // --- CHECKOUT ACTION ---

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const { data } = await axios.post("/api/checkout", {
        cartItems: cart.cartItems,
        customer: { name, email },
      });

      setReceipt(data);
      setCart({ cartItems: [], total: 0 });
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  return (
    <>
      <CheckoutModal receipt={receipt} onClose={() => setReceipt(null)} />
      <AddProductModal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        onProductAdded={handleProductAdded}
      />

      <div className="bg-gray-100 min-h-screen">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-6 py-4">
            <h1 className="text-3xl font-bold text-gray-800">Vibe Commerce</h1>
          </nav>
        </header>

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Products Section */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700">
                  Products
                </h2>
                <button
                  onClick={() => setIsProductModalOpen(true)}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
                >
                  + Add New Product
                </button>
              </div>

              {loading ? (
                <p>Loading products...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.map((product) => {
                    // --- CHANGED: Logic to check if item is in cart ---
                    const cartItem = cart.cartItems.find(
                      (item) => item.product._id === product._id
                    );

                    return (
                      <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden"
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-semibold text-lg text-gray-800">
                            {product.name}
                          </h3>
                          <p className="text-gray-600 mt-1">
                            ${product.price.toFixed(2)}
                          </p>

                          {/* --- CHANGED: Conditional buttons --- */}
                          <div className="mt-4">
                            {cartItem ? (
                              // If in cart, show quantity controls
                              <div className="flex items-center justify-center space-x-4">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      cartItem._id,
                                      "decrement"
                                    )
                                  }
                                  className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full font-bold hover:bg-gray-300 transition duration-300"
                                >
                                  -
                                </button>
                                <span className="font-semibold text-lg text-gray-800">
                                  {cartItem.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      cartItem._id,
                                      "increment"
                                    )
                                  }
                                  className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full font-bold hover:bg-gray-300 transition duration-300"
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              // If not in cart, show "Add to Cart" button
                              <button
                                onClick={() => handleAddToCart(product._id)}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                              >
                                Add to Cart
                              </button>
                            )}
                          </div>
                          {/* --- END OF CHANGE --- */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Cart & Checkout Section */}
            <div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
                <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                  My Cart
                </h2>
                {loading ? (
                  <p>Loading cart...</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                      {cart.cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">
                          Your cart is empty.
                        </p>
                      ) : (
                        cart.cartItems.map((item) => (
                          // --- CHANGED: Added wrapper div ---
                          <div
                            key={item._id}
                            className="flex justify-between items-center"
                          >
                            {/* NEW: Wrapper for image and text */}
                            <div className="flex items-center">
                              <img
                                src={item.product.imageUrl}
                                alt={item.product.name}
                                className="w-12 h-12 object-cover rounded-md mr-3"
                              />
                              <div>
                                <h4 className="font-semibold text-gray-800">
                                  {item.product.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  ${item.product.price.toFixed(2)}
                                </p>
                              </div>
                            </div>
                            {/* --- END OF CHANGE --- */}

                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item._id, "decrement")
                                }
                                className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full hover:bg-gray-300"
                              >
                                -
                              </button>
                              <span className="font-semibold text-gray-800 w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  handleUpdateQuantity(item._id, "increment")
                                }
                                className="bg-gray-200 text-gray-700 w-6 h-6 rounded-full hover:bg-gray-300"
                              >
                                +
                              </button>
                              <button
                                onClick={() => handleRemoveFromCart(item._id)}
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                &times;
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Cart Total */}
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center text-xl font-semibold text-gray-800">
                        <span>Total:</span>
                        <span>${cart.total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Form */}
                    <form
                      onSubmit={handleCheckout}
                      className="mt-6 border-t pt-6"
                    >
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
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
