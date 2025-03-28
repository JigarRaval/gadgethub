const express = require("express");
const { 
  getProducts, 
  getProductById,  // Make sure this is imported
  addProduct, 
  updateProduct, 
  deleteProduct 
} = require("../controllers/productController");
const { protect, admin } = require("../middleware/authMiddleware");
const Product = require("../models/Product"); // Only needed if you're keeping the inline route

const router = express.Router();

// GET /api/products - Get all products
router.get("/", getProducts);

// GET /api/products/:id - Get single product by ID
router.get("/:id", getProductById); // Using the controller function

// POST /api/products - Create a product (Admin only)
router.post("/", protect, admin, addProduct);

// PUT /api/products/:id - Update a product (Admin only)
router.put("/:id", protect, admin, updateProduct);

// DELETE /api/products/:id - Delete a product (Admin only)
router.delete("/:id", protect, admin, deleteProduct);

module.exports = router;