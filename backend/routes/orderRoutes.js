const express = require("express");
const { getOrders, createOrder, updateOrderStatus } = require("../controllers/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, admin, getOrders);
router.post("/", protect, createOrder);
router.put("/:id", protect, admin, updateOrderStatus);

module.exports = router;
