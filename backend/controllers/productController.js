const mongoose = require('mongoose');
const Product = require('../models/Product');
const axios = require('axios'); // Add axios for HTTP requests

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    // Check if ID is numeric (legacy support)
    if (!isNaN(req.params.id)) {
      const product = await Product.findOne({ numericId: parseInt(req.params.id) });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }

    // Check if ID is valid MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ 
        message: 'Invalid product ID format',
        suggestion: 'ID should be either numeric or 24-character MongoDB ID'
      });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      message: 'Server error while fetching product',
      error: error.message 
    });
  }
};

// Get product by ID (for external API calls)
const fetchProductById = async (id) => {
  try {
    const API_URL = process.env.API_URL || 'http://localhost:5000';
    const response = await axios.get(`${API_URL}/api/products/${id}`);
    
    if (response.status === 400) {
      throw new Error("Invalid product ID - please try another product");
    }
    
    if (response.status === 404) {
      throw new Error("Product not found");
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching product details:', error);
    
    if (error.message.includes('Network Error')) {
      throw new Error("Cannot connect to server. Please check your connection.");
    }
    
    throw error;
  }
};

// Add a product
const addProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ 
      message: "Product deleted successfully",
      deletedProduct 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  getProducts, 
  getProductById,
  fetchProductById,
  addProduct, 
  updateProduct, 
  deleteProduct 
};