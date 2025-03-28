const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");

router.post("/", getCart);
router.post("/add", addToCart);
router.post("/update", updateCartItem);
router.post("/remove", removeCartItem);
router.post("/clear", clearCart);

module.exports = router;