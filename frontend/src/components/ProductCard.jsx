import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart, FaEye } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const ProductCard = ({ product = {}, showWishlist = true }) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  // Safely destructure with defaults
  const {
    _id = '',
    name = 'Product Name',
    price = 0,
    oldPrice = 0,
    image = `https://robohash.org/default.png?set=set1`,
    rating = 0,
    reviewCount = 0,
    category = 'uncategorized'
  } = product || {};

  // Check wishlist status
  useEffect(() => {
    if (!user || !showWishlist || !_id) return;
    
    const checkWishlistStatus = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const token = localStorage.getItem('token');
        
        const response = await axios.get(`${API_URL}/api/wishlist`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const wishlistItems = Array.isArray(response.data) 
          ? response.data 
          : response.data.items || [];
        
        const isInWishlist = wishlistItems.some(item => 
          item.product === _id || item.product?._id === _id
        );
        
        setIsInWishlist(isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist status:", error);
        setIsInWishlist(false);
      }
    };
    
    checkWishlistStatus();
  }, [user, _id, showWishlist]);

  const handleViewDetails = () => {
    if (!_id) return;
    navigate(`/products/${_id}`, { state: { product } });
  };

  const toggleWishlist = async (e) => {
    e.stopPropagation();
    if (!showWishlist || !_id) return;
    
    if (!user) {
      toast.info("Please login to manage your wishlist", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate('/login');
      return;
    }

    try {
      setWishlistLoading(true);
      setError(null);
      
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('token');

      if (isInWishlist) {
        await axios.delete(`${API_URL}/api/wishlist/${_id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Removed from wishlist");
      } else {
        await axios.post(`${API_URL}/api/wishlist`, { 
          productId: _id,
          name,
          price,
          image,
          category
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success("Added to wishlist");
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error("Wishlist error:", error);
      const message = error.response?.data?.message || 
                     (error.response?.status === 401 
                      ? "Please login to manage wishlist" 
                      : "Failed to update wishlist");
      setError(message);
      toast.error(message);
    } finally {
      setWishlistLoading(false);
    }
  };

  const toggleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(!showQuickView);
  };

  if (!product) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg h-full flex flex-col">
        <div className="animate-pulse bg-gray-200 h-48 w-full rounded-lg"></div>
        <div className="mt-4 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition relative overflow-hidden flex flex-col h-full cursor-pointer"
        onClick={handleViewDetails}
      >
        {/* Badges */}
        {oldPrice > price && (
          <span className="absolute top-3 left-3 z-10 text-xs bg-red-500 text-white px-2 py-1 rounded-full">
            {Math.round((1 - price/oldPrice) * 100)}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        {showWishlist && (
          <button
            onClick={toggleWishlist}
            disabled={wishlistLoading}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full shadow-md ${
              wishlistLoading ? 'bg-gray-200' : 'bg-white'
            }`}
            aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            {wishlistLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
            ) : isInWishlist ? (
              <FaHeart className="text-red-500 text-xl" />
            ) : (
              <FaRegHeart className="text-gray-500 text-xl hover:text-red-500" />
            )}
          </button>
        )}

        {/* Product Image */}
        <div className="relative pt-[100%] overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              e.target.src = `https://robohash.org/${_id || 'default'}.png?set=set2`;
              e.target.className = "absolute top-0 left-0 w-full h-full object-cover bg-gray-200";
            }}
          />
          
          {/* Quick View Button */}
          <button
            onClick={toggleQuickView}
            className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-opacity"
            aria-label="Quick view"
          >
            <FaEye className="text-sm" />
          </button>
        </div>

        {/* Product Info */}
        <div className="mt-3 flex-grow">
          <h3 className="text-lg font-semibold line-clamp-2 mb-1">
            {name}
          </h3>
          
          <p className="text-gray-500 text-sm mb-2">{category}</p>
          
          <div className="mb-2">
            {oldPrice > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold text-lg">
                  ${price.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${oldPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <p className="text-blue-600 font-bold text-lg">
                ${price.toFixed(2)}
              </p>
            )}
          </div>

          {rating > 0 && (
            <div className="flex items-center">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>
                    {i < Math.floor(rating) ? '★' : '☆'}
                  </span>
                ))}
              </div>
              <span className="text-gray-500 text-sm ml-1">
                ({reviewCount})
              </span>
            </div>
          )}
        </div>

        {/* Single Centered Details Button */}
        <div className="mt-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full font-medium shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
          >
            <FaEye /> View Details
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-2 text-red-500 text-sm text-center">
            {error}
          </div>
        )}
      </motion.div>

      {/* Quick View Modal */}
      {showQuickView && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowQuickView(false)}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{name}</h2>
                <button 
                  onClick={() => setShowQuickView(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="mb-4">
                <img 
                  src={image}
                  alt={name}
                  className="w-full h-64 object-contain rounded-lg"
                />
              </div>
              
              <div className="mb-4">
                {oldPrice > 0 ? (
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-red-500">
                      ${price.toFixed(2)}
                    </span>
                    <span className="text-gray-500 line-through">
                      ${oldPrice.toFixed(2)}
                    </span>
                    <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                      {Math.round((1 - price/oldPrice) * 100)}% OFF
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-bold text-blue-600">
                    ${price.toFixed(2)}
                  </p>
                )}
              </div>
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleViewDetails();
                  setShowQuickView(false);
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                <FaEye /> View Details
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductCard;