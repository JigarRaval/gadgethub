import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHeartBroken, FaShoppingBag, FaTrash, FaSpinner, FaCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToCart, getSessionId } from '../services/cartAPI';

const WishlistPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removing, setRemoving] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get('http://localhost:5000/api/wishlist');
        
        // Handle different response structures
        let items = [];
        if (response.data.status === 'success') {
          items = response.data.data?.items || [];
        } else if (Array.isArray(response.data)) {
          items = response.data;
        } else if (response.data.items) {
          items = response.data.items;
        }

        if (!Array.isArray(items)) {
          throw new Error('Invalid wishlist data format');
        }

        setWishlistItems(items);
      } catch (error) {
        setError(
          error.response?.data?.message || 
          error.message || 
          'Failed to load wishlist'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      setRemoving(productId);
      await axios.delete(`http://localhost:5000/api/wishlist/${productId}`);
      setWishlistItems(prev => prev.filter(item => item.productId !== productId));
      toast.success('Item removed from wishlist');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to remove item from wishlist'
      );
    } finally {
      setRemoving(null);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      setAddingToCart(product.productId);
      const sessionId = getSessionId();
      
      // Prepare product data for cart
      const cartItem = {
        sessionId,
        productId: product.productId || product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      };

      // Add to cart
      await addToCart(cartItem);

      // Remove from wishlist after adding to cart
      await axios.delete(`http://localhost:5000/api/wishlist/${product.productId}`);
      setWishlistItems(prev => prev.filter(item => item.productId !== product.productId));

      toast.success(
        <div className="flex items-center">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-8 h-8 object-cover rounded mr-2"
            onError={(e) => e.target.src = 'https://via.placeholder.com/40'}
          />
          <span>{product.name} added to cart</span>
        </div>,
        { position: "top-right", autoClose: 2000 }
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || 
        'Failed to add item to cart',
        { position: "top-right" }
      );
    } finally {
      setAddingToCart(null);
    }
  };

  const handleBrowseProducts = () => navigate('/products');

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FaSpinner className="animate-spin text-4xl text-blue-500 mb-4" />
        <p className="text-lg">Loading your wishlist...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <FaHeartBroken className="text-4xl text-red-500 mb-4" />
        <h2 className="text-xl font-bold text-center mb-2">Oops! Something went wrong</h2>
        <p className="text-red-500 text-center mb-6">{error}</p>
        <div className="flex gap-4">
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition"
          >
            Try Again
          </button>
          <button
            onClick={handleBrowseProducts}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
          Your Wishlist
        </h2>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <FaHeartBroken className="inline-block text-4xl text-pink-400 mb-4" />
            <p className="text-lg text-gray-600 mb-6">Your wishlist is empty</p>
            <button
              onClick={handleBrowseProducts}
              className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
            >
              <FaShoppingBag className="mr-2" />
              Browse Products
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((product) => (
                <motion.div
                  key={product.id || product.productId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/300?text=${product.name}`;
                        e.target.className = 'w-full h-48 object-cover bg-gray-200';
                      }}
                    />
                    <button
                      onClick={() => removeFromWishlist(product.productId || product.id)}
                      disabled={removing === (product.productId || product.id)}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition"
                      aria-label="Remove from wishlist"
                    >
                      {removing === (product.productId || product.id) ? (
                        <FaSpinner className="animate-spin text-red-500" />
                      ) : (
                        <FaTrash className="text-red-500" />
                      )}
                    </button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                    <p className="text-blue-600 font-bold text-xl mb-4">
                      ${product.price?.toFixed(2) || '0.00'}
                    </p>
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === (product.productId || product.id)}
                      className={`w-full flex items-center justify-center py-2 px-4 ${
                        addingToCart === (product.productId || product.id) 
                          ? 'bg-green-500' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      } text-white rounded-lg transition`}
                    >
                      {addingToCart === (product.productId || product.id) ? (
                        <>
                          <FaCheck className="mr-2" />
                          Added!
                        </>
                      ) : (
                        <>
                          <FaShoppingBag className="mr-2" />
                          Add to Cart
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center text-gray-500">
              {wishlistItems.length} item{wishlistItems.length !== 1 ? 's' : ''} in wishlist
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;