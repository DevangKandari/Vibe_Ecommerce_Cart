import { useState, useEffect } from "react";
import axios from "axios";

import CheckoutModal from "./components/checkoutModal";
import AddProductModal from "./components/AddProductModal";

import Header from "./components/Header";
import Cart from "./components/Cart";
import ProductItem from "./components/ProductItem";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ cartItems: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [receipt, setReceipt] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [productsRes, cartRes] = await Promise.all([
          axios.get("/api/products"),
          axios.get("/api/cart"),
        ]);
        setProducts(productsRes.data);
        setCart(cartRes.data);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

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

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    try {
      const { data } = await axios.post("/api/checkout", {
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
        <Header />

        <main className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {loading ? (
              <p className="lg:col-span-3 text-center">Loading...</p>
            ) : (
              <>
                {/* Product Grid*/}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => {
                      const cartItem = cart.cartItems.find(
                        (item) => item.product._id === product._id
                      );
                      return (
                        <ProductItem
                          key={product._id}
                          product={product}
                          cartItem={cartItem}
                          onAddToCart={handleAddToCart}
                          onUpdateQuantity={handleUpdateQuantity}
                        />
                      );
                    })}
                  </div>
                </div>

                <Cart
                  cart={cart}
                  name={name}
                  email={email}
                  setName={setName}
                  setEmail={setEmail}
                  onRemoveFromCart={handleRemoveFromCart}
                  onUpdateQuantity={handleUpdateQuantity}
                  onCheckout={handleCheckout}
                />
              </>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default App;
