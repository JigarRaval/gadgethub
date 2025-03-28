const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const Wishlist = require('../models/WishlistItem')
// Public routes (no authentication required)
router.post('/', wishlistController.addToWishlist);
router.get('/', wishlistController.getWishlist);
router.delete('/:productId', wishlistController.removeFromWishlist);
// In your wishlist routes file
router.get('/check/:productId', async (req, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      
      const wishlistItem = await Wishlist.findOne({ 
        user: userId, 
        product: productId 
      });
      
      res.json({ isInWishlist: !!wishlistItem });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
module.exports = router;