const express = require("express");
const router = express.Router();
const { mockCheckout } = require("../controllers/checkoutController");

router.post("/", mockCheckout);

module.exports = router;
