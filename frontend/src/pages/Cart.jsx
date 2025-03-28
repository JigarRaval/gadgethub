import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiTrash2, FiShoppingBag, FiArrowLeft, FiPlus, FiMinus } from "react-icons/fi";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCart, removeCartItem, getSessionId, updateCartItem } from "../services/cartAPI";

const Cart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], subtotal: 0, totalItems: 0 });
  const [loading, setLoading] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [updatingItems, setUpdatingItems] = useState({});

  useEffect(() => {
    const loadCart = async () => {
      try {
        setLoading(true);
        const sessionId = getSessionId();
        setSessionId(sessionId);
        const cartData = await getCart(sessionId);
        setCart({
          items: cartData?.items || [],
          subtotal: cartData?.subtotal || 0,
          totalItems: cartData?.totalItems || 0,
        });
      } catch (error) {
        console.error("Cart loading error:", error);
        toast.error("Failed to load cart", {
          position: "top-right",
          autoClose: 2000,
        });
        setCart({ items: [], subtotal: 0, totalItems: 0 });
      } finally {
        setLoading(false);
      }
    };
    loadCart();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      const item = cart.items.find((item) => item._id === itemId);
      if (!item) throw new Error("Item not found in cart");

      const updatedCart = await removeCartItem({ sessionId, itemId });
      setCart(updatedCart || { items: [], subtotal: 0, totalItems: 0 });
      
      toast.success(
        <div>
          <span className="font-medium">{item.name}</span> removed from cart
        </div>,
        {
          position: "top-right",
          autoClose: 2000,
          className: "!bg-green-50 !text-green-800",
        }
      );
    } catch (error) {
      console.error("Remove item error:", error);
      toast.error(error.response?.data?.message || "Failed to remove item", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    
    try {
      setUpdatingItems(prev => ({ ...prev, [itemId]: true }));
      const updatedCart = await updateCartItem({
        sessionId,
        itemId,
        quantity: newQuantity
      });
      setCart(updatedCart);
    } catch (error) {
      console.error("Update quantity error:", error);
      toast.error("Failed to update quantity", {
        position: "top-right",
        autoClose: 2000,
      });
    } finally {
      setUpdatingItems(prev => ({ ...prev, [itemId]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading your cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-900 mb-2"
        >
          Your Shopping Cart
        </motion.h2>
        
        <p className="text-center text-gray-500 mb-12">
          {cart.totalItems > 0 
            ? `Review your ${cart.totalItems} item${cart.totalItems !== 1 ? 's' : ''}`
            : "Your cart awaits"}
        </p>

        {cart.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-sm max-w-2xl mx-auto"
          >
            <div className="text-8xl mb-6 text-gray-200">
              <FiShoppingBag className="inline-block" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added anything to your cart yet. Let's find something you'll love!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/products")}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all text-lg font-medium"
            >
              Browse Our Products
            </motion.button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="divide-y divide-gray-100">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image || "https://via.placeholder.com/150"}
                            alt={item.name}
                            className="w-32 h-32 object-contain rounded-lg border border-gray-200"
                            onError={(e) => {
                              e.target.src = "https://via.placeholder.com/150";
                              e.target.className = "w-32 h-32 object-cover rounded-lg bg-gray-100";
                            }}
                          />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                              {item.name}
                            </h3>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRemoveItem(item._id)}
                              className="text-gray-400 hover:text-red-500 transition-colors h-8 w-8 flex items-center justify-center"
                              aria-label="Remove item"
                            >
                              <FiTrash2 className="w-5 h-5" />
                            </motion.button>
                          </div>
                          
                          <p className="text-blue-600 font-bold text-lg mb-4">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1 || updatingItems[item._id]}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                              >
                                <FiMinus />
                              </button>
                              <span className="px-4 py-1 bg-white font-medium">
                                {updatingItems[item._id] ? (
                                  <div className="animate-spin h-5 w-5 border-b-2 border-blue-500 rounded-full mx-auto"></div>
                                ) : (
                                  item.quantity
                                )}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                disabled={updatingItems[item._id]}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 transition-colors disabled:opacity-50"
                              >
                                <FiPlus />
                              </button>
                            </div>
                            
                            <p className="text-sm text-gray-500">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-4">
                  Have questions about your order? Our customer service team is happy to help.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Contact Support
                </button>
              </motion.div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:sticky lg:top-8 h-fit">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm p-8 border border-gray-100"
              >
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Subtotal ({cart.totalItems} items)</span>
                    <span className="font-medium">${cart.subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-green-600 font-medium">FREE</span>
                  </div>
                  
                  <div className="flex justify-between text-lg">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 flex justify-between text-xl">
                    <span className="font-bold">Total</span>
                    <span className="font-bold text-blue-600">
                      ${cart.subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all text-lg"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </motion.button>
                
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-500 mb-2">
                    Secure checkout with 256-bit SSL encryption
                  </p>
                  <div className="flex justify-center space-x-6">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-8" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-8" alt="Mastercard" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-8" alt="PayPal" />
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <button 
                    onClick={() => navigate("/products")}
                    className="w-full py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 bg-blue-50 rounded-2xl p-6 text-center"
              >
                <h4 className="font-medium text-blue-800 mb-2">Free Shipping</h4>
                <p className="text-sm text-blue-600">
                  Enjoy free standard shipping on all orders over $50
                </p>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;