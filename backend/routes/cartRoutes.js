const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} = require("../controllers/cartController");

router.route("/").get(getCart).post(addToCart);

router.route("/:id").put(updateCartItemQuantity).delete(removeFromCart);

module.exports = router;
