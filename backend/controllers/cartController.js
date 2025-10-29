const CartItem = require("../models/cartModel");
const Product = require("../models/productModel");

const getCart = async (req, res) => {
  try {
    const cartItems = await CartItem.find().populate("product");

    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    res.json({
      cartItems,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let cartItem = await CartItem.findOne({ product: productId });

    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = new CartItem({
        product: productId,
        quantity: quantity || 1,
      });
      await cartItem.save();
    }

    const cartItems = await CartItem.find().populate("product");
    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    res.json({
      cartItems,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const removeFromCart = async (req, res) => {
  try {
    const cartItem = await CartItem.findById(req.params.id);

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    await cartItem.deleteOne();

    const cartItems = await CartItem.find().populate("product");
    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    res.json({
      cartItems,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateCartItemQuantity = async (req, res) => {
  const { action } = req.body;

  try {
    const cartItem = await CartItem.findById(req.params.id).populate("product");

    if (!cartItem) {
      return res.status(404).json({ msg: "Cart item not found" });
    }

    if (action === "increment") {
      cartItem.quantity += 1;
      await cartItem.save();
    } else if (action === "decrement") {
      cartItem.quantity -= 1;

      if (cartItem.quantity <= 0) {
        await cartItem.deleteOne();
      } else {
        await cartItem.save();
      }
    } else {
      return res.status(400).json({ msg: "Invalid action" });
    }

    // Always return the fresh, full cart
    const cartItems = await CartItem.find().populate("product");
    const total = cartItems.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    res.json({
      cartItems,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
};
