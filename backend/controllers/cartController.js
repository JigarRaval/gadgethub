const Cart = require("../models/Cart");
const Product = require("../models/Product");

// Helper to calculate cart totals
const calculateCartTotals = (items) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  return { subtotal, totalItems };
};

// Create or get session cart
const getSessionCart = async (sessionId) => {
  let cart = await Cart.findOne({ sessionId }).lean();

  if (!cart) {
    cart = await Cart.create({
      sessionId,
      items: [],
    });
  }

  return cart;
};

// Get cart
exports.getCart = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const cart = await getSessionCart(sessionId);

    const { subtotal, totalItems } = calculateCartTotals(cart.items);

    res.status(200).json({
      success: true,
      cart: {
        ...cart,
        subtotal,
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching cart",
    });
  }
};

// Add to cart
exports.addToCart = async (req, res) => {
  try {
    const { sessionId, productId, quantity = 1 } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      cart = await Cart.create({
        sessionId,
        items: [
          {
            productId: product._id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity,
          },
        ],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
        });
      }
      await cart.save();
    }

    const { subtotal, totalItems } = calculateCartTotals(cart.items);

    res.status(200).json({
      success: true,
      cart: {
        ...cart.toObject(),
        subtotal,
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding to cart",
    });
  }
};

// Update item quantity

// Update cart item - fixed version
exports.updateCartItem = async (req, res) => {
  try {
    const { sessionId, itemId, quantity } = req.body;

    // Validate inputs
    if (!sessionId || !itemId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: sessionId, itemId, quantity",
      });
    }

    if (isNaN(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be a number greater than 0",
      });
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find the item using safe comparison
    const itemToUpdate = cart.items.find(
      (item) => item._id && item._id.toString() === itemId
    );

    if (!itemToUpdate) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    // Update quantity
    itemToUpdate.quantity = Number(quantity);
    await cart.save();

    const { subtotal, totalItems } = calculateCartTotals(cart.items);

    res.status(200).json({
      success: true,
      cart: {
        ...cart.toObject(),
        subtotal,
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating cart item",
      error: error.message, // Include error message for debugging
    });
  }
};
// Remove item from cart
exports.removeCartItem = async (req, res) => {
  try {
    const { sessionId, itemId } = req.body;

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(
      (item) => item._id && item._id.toString() !== itemId
    );

    if (cart.items.length === initialLength) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    await cart.save();

    const { subtotal, totalItems } = calculateCartTotals(cart.items);

    res.status(200).json({
      success: true,
      cart: {
        ...cart.toObject(),
        subtotal,
        totalItems,
      },
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
    res.status(500).json({
      success: false,
      message: "Server error while removing cart item",
    });
  }
};

// Clear cart
exports.clearCart = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { sessionId },
      { $set: { items: [] } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      cart: {
        items: [],
        subtotal: 0,
        totalItems: 0,
      },
    });
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: "Server error while clearing cart",
    });
  }
};