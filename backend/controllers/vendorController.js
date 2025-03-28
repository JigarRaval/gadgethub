const Vendor = require('../models/Vendor');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Register vendor
// @route   POST /api/vendors/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, storeName, phone } = req.body;

  // Create vendor
  const vendor = await Vendor.create({
    name,
    email,
    password,
    storeName,
    phone
  });

  sendTokenResponse(vendor, 200, res);
});

// @desc    Login vendor
// @route   POST /api/vendors/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check for vendor
  const vendor = await Vendor.findOne({ email }).select('+password');

  if (!vendor) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await vendor.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(vendor, 200, res);
});

// @desc    Get current logged in vendor
// @route   GET /api/vendors/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const vendor = await Vendor.findById(req.vendor.id).populate('products');

  res.status(200).json({
    success: true,
    data: vendor
  });
});

// @desc    Get vendor dashboard stats
// @route   GET /api/vendors/dashboard
// @access  Private
exports.getDashboard = asyncHandler(async (req, res, next) => {
  // In a real app, you would aggregate data from orders, products, etc.
  const stats = {
    products: 15, // Replace with actual count from DB
    orders: 42,   // Replace with actual count from DB
    revenue: 1250.75 // Replace with actual sum from DB
  };

  res.status(200).json({
    success: true,
    data: stats
  });
});

// @desc    Update vendor details
// @route   PUT /api/vendors/updatedetails
// @access  Private
exports.updateDetails = asyncHandler(async (req, res, next) => {
  const fieldsToUpdate = {
    name: req.body.name,
    email: req.body.email,
    storeName: req.body.storeName,
    phone: req.body.phone
  };

  const vendor = await Vendor.findByIdAndUpdate(req.vendor.id, fieldsToUpdate, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: vendor
  });
});

// @desc    Update password
// @route   PUT /api/vendors/updatepassword
// @access  Private
exports.updatePassword = asyncHandler(async (req, res, next) => {
  const vendor = await Vendor.findById(req.vendor.id).select('+password');

  // Check current password
  if (!(await vendor.matchPassword(req.body.currentPassword))) {
    return next(new ErrorResponse('Password is incorrect', 401));
  }

  vendor.password = req.body.newPassword;
  await vendor.save();

  sendTokenResponse(vendor, 200, res);
});

// Get token from model, create cookie and send response
const sendTokenResponse = (vendor, statusCode, res) => {
  // Create token
  const token = vendor.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        storeName: vendor.storeName
      }
    });
};