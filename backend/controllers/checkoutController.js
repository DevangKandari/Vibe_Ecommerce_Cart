const CartItem = require("../models/cartModel");

const mockCheckout = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    await CartItem.deleteMany({});

    const receipt = {
      receiptId: `MOCK-${Date.now()}`,
      items: cartItems.map((item) => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
      })),
      total: parseFloat(total.toFixed(2)),
      timestamp: new Date().toISOString(),
    };

    res.json(receipt);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  mockCheckout,
};
