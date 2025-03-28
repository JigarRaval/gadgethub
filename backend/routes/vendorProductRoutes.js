const express = require("express");
const router = express.Router();
const VendorProduct = require("../models/VendorProduct");
const { protect, admin, vendorAuth } = require("../middleware/authMiddleware");

// Add a new product (protected - vendor auth)
router.post("/", vendorAuth, async (req, res) => {
  try {
    const product = new VendorProduct({
      ...req.body,
      vendor: req.vendor._id,
      approved: false, // Products need admin approval
    });

    await product.save();
    res.status(201).json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
        approved: product.approved,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to create product",
      error: error.message,
    });
  }
});

// Get all vendor's products (protected - vendor auth)
router.get("/mine", vendorAuth, async (req, res) => {
  try {
    const products = await VendorProduct.find({ vendor: req.vendor._id })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Get a single product (protected - vendor auth)
router.get("/:id", vendorAuth, async (req, res) => {
  try {
    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Update a product (protected - vendor auth)
router.put("/:id", vendorAuth, async (req, res) => {
  try {
    const { name, description, price, category, stock, images, attributes } =
      req.body;

    const product = await VendorProduct.findOne({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;
    product.images = images || product.images;
    product.attributes = attributes || product.attributes;
    product.updatedAt = Date.now();
    product.approved = false; // Needs re-approval after update

    await product.save();

    res.json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        price: product.price,
        category: product.category,
        approved: product.approved,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
});

// Delete a product (protected - vendor auth)
router.delete("/:id", vendorAuth, async (req, res) => {
  try {
    const product = await VendorProduct.findOneAndDelete({
      _id: req.params.id,
      vendor: req.vendor._id,
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Admin route to approve products (protected - admin auth)
router.patch("/approve/:id", protect, admin, async (req, res) => {
  try {
    const product = await VendorProduct.findByIdAndUpdate(
      req.params.id,
      {
        approved: true,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        approved: product.approved,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to approve product",
      error: error.message,
    });
  }
});

module.exports = router;
