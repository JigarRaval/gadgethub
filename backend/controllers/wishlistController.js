// Temporary in-memory storage
let wishlistItems = [];

// Helper function for consistent response format
const sendResponse = (res, statusCode, status, data = null, message = '') => {
  res.status(statusCode).json({
    status,
    data,
    message
  });
};

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId, name, price, image } = req.body;

    // Validate required fields
    if (!productId || !name || price === undefined || !image) {
      return sendResponse(res, 400, 'fail', null, 'Missing required product fields');
    }

    // Check if product already exists
    const exists = wishlistItems.some(item => item.productId === productId);
    if (exists) {
      return sendResponse(res, 400, 'fail', null, 'Product already in wishlist');
    }

    const newItem = {
      id: Date.now().toString(),
      productId,
      name,
      price,
      image,
      createdAt: new Date().toISOString()
    };

    wishlistItems.push(newItem);
    sendResponse(res, 201, 'success', { item: newItem });
    
  } catch (error) {
    console.error('Add to wishlist error:', error);
    sendResponse(res, 500, 'error', null, error.message);
  }
};

// Get all wishlist items
exports.getWishlist = async (req, res) => {
  try {
    sendResponse(res, 200, 'success', { items: wishlistItems });
  } catch (error) {
    console.error('Get wishlist error:', error);
    sendResponse(res, 500, 'error', null, 'Failed to fetch wishlist');
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const initialLength = wishlistItems.length;
    wishlistItems = wishlistItems.filter(item => item.productId !== productId);

    if (wishlistItems.length === initialLength) {
      return sendResponse(res, 404, 'fail', null, 'Product not found in wishlist');
    }

    sendResponse(res, 200, 'success', { remainingItems: wishlistItems.length });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    sendResponse(res, 500, 'error', null, error.message);
  }
};