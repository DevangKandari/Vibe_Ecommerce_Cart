const CartItem = require("../models/cartModel");
const Order = require("../models/orderModel");

const mockCheckout = async (req, res) => {
  const { customer } = req.body;
  if (!customer || !customer.name || !customer.email) {
    return res.status(400).json({ msg: "Customer information is missing" });
  }

  try {
    const cartItems = await CartItem.find().populate("product");

    if (cartItems.length === 0) {
      return res.status(400).json({ msg: "Cart is empty" });
    }

    let total = 0;
    const orderItems = cartItems.map((item) => {
      if (!item.product) {
        throw new Error("A cart item is missing product details.");
      }

      const itemTotal = item.product.price * item.quantity;
      total += itemTotal;

      return {
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.price,
        product: item.product._id,
      };
    });

    const finalTotalPrice = parseFloat(total.toFixed(2));

    const newOrder = new Order({
      customer: {
        name: customer.name,
        email: customer.email,
      },
      items: orderItems,
      totalPrice: finalTotalPrice,
    });

    const savedOrder = await newOrder.save();

    await CartItem.deleteMany({});

    const receipt = {
      receiptId: savedOrder._id,
      items: savedOrder.items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: savedOrder.totalPrice,
      timestamp: savedOrder.createdAt,
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
