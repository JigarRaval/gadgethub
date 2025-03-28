const Product = require('../models/Product');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all products for a vendor
// @route   GET /api/vendors/products
// @access  Private
exports.getVendorProducts = asyncHandler(async (req, res, next) => {
  const products = await Product.find({ vendor: req.vendor.id });
  
  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  });
});

// @desc    Get single product for a vendor
// @route   GET /api/vendors/products/:id
// @access  Private
exports.getVendorProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findOne({
    _id: req.params.id,
    vendor: req.vendor.id
  });

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Create product for a vendor
// @route   POST /api/vendors/products
// @access  Private
exports.createVendorProduct = asyncHandler(async (req, res, next) => {
  // Add vendor to req.body
  req.body.vendor = req.vendor.id;

  const product = await Product.create(req.body);

  // Add product to vendor's products array
  await Vendor.findByIdAndUpdate(req.vendor.id, {
    $push: { products: product._id }
  });

  res.status(201).json({
    success: true,
    data: product
  });
});

// @desc    Update product for a vendor
// @route   PUT /api/vendors/products/:id
// @access  Private
exports.updateVendorProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure vendor owns the product
  if (product.vendor.toString() !== req.vendor.id) {
    return next(
      new ErrorResponse(`Not authorized to update this product`, 401)
    );
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: product
  });
});

// @desc    Delete product for a vendor
// @route   DELETE /api/vendors/products/:id
// @access  Private
exports.deleteVendorProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(
      new ErrorResponse(`Product not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure vendor owns the product
  if (product.vendor.toString() !== req.vendor.id) {
    return next(
      new ErrorResponse(`Not authorized to delete this product`, 401)
    );
  }

  await product.remove();

  // Remove product from vendor's products array
  await Vendor.findByIdAndUpdate(req.vendor.id, {
    $pull: { products: product._id }
  });

  res.status(200).json({
    success: true,
    data: {}
  });
});