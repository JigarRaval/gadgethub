import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiStar, FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { getProductById } from "../services/productAPI";
import { addToCart } from "../services/cartAPI";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductDetails = ({ updateCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getProductById(id);

        if (!response?.data) {
          throw new Error("Product not found");
        }

        if (!response.data._id || !response.data.name || !response.data.price) {
          throw new Error("Invalid product data received");
        }

        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);

        let errorMessage = "Failed to load product details";
        if (err.response?.status === 404) {
          errorMessage = "Product not found";
        } else if (err.response?.status === 400) {
          errorMessage = "Invalid product ID";
        } else if (err.message.includes("Network Error")) {
          errorMessage = "Network error. Please check your connection.";
        }

        setError(errorMessage);
        toast.error(errorMessage, {
          position: "top-right",
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
  try {
    setCartLoading(true);

    // Get or create session ID
    let sessionId = localStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      localStorage.setItem("sessionId", sessionId);
    }

    const response = await addToCart({
      sessionId,
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
    });

    if (response.success) {
      toast.success(
        <div className="flex items-start">
          <img 
            src={product.image || `https://via.placeholder.com/100?text=${encodeURIComponent(product.name)}`} 
            alt={product.name}
            className="w-12 h-12 object-contain mr-3 rounded"
          />
          <div>
            <p className="font-semibold">
              {quantity > 1 ? `${quantity} ${product.name}s` : product.name} added to cart!
            </p>
            <p className="text-sm text-gray-600">
              ${(product.price * quantity).toFixed(2)} total
            </p>
            <button 
              onClick={() => {
                navigate("/cart");
                toast.dismiss();
              }}
              className="mt-1 text-sm text-blue-500 hover:underline"
            >
              View Cart
            </button>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 5000,
          closeButton: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className: "!bg-white !text-gray-800 !shadow-lg !rounded-lg",
          bodyClassName: "!p-4",
        }
      );
      if (updateCart) {
        updateCart();
      }
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
    toast.error(err.response?.data?.message || "Failed to add to cart", {
      position: "top-right",
      autoClose: 3000,
      className: "!bg-red-50 !text-red-800",
    });
  } finally {
    setCartLoading(false);
  }
};

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {error || "Product not found"}
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center justify-center mx-auto"
          >
            <FiArrowLeft className="mr-2" /> Back to products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-500 hover:text-blue-700 flex items-center"
        >
          <FiArrowLeft className="mr-1" /> Back to products
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div
            className="w-full md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={
                product.image ||
                `https://via.placeholder.com/500?text=${encodeURIComponent(
                  product.name
                )}`
              }
              alt={product.name}
              className="w-full h-auto max-h-[500px] object-contain p-4"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/500?text=${encodeURIComponent(
                  product.name
                )}`;
                e.target.className =
                  "w-full h-auto max-h-[500px] object-cover bg-gray-200 p-4";
              }}
            />
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-bold text-blue-600">
                ${product.price.toFixed(2)}
              </p>
              {product.oldPrice && product.oldPrice > product.price && (
                <>
                  <p className="text-lg text-gray-500 line-through">
                    ${product.oldPrice.toFixed(2)}
                  </p>
                  <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.oldPrice) * 100)}%
                    OFF
                  </span>
                </>
              )}
            </div>

            {product.rating && (
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FiStar
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.round(product.rating) ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating.toFixed(1)}/5{" "}
                  {product.reviewCount
                    ? `(${product.reviewCount} reviews)`
                    : ""}
                </span>
              </div>
            )}

            <div className="mb-6">
              <div className="flex items-center mb-4">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 py-1 bg-gray-100 border-t border-b border-gray-200">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>

            {product.description && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={cartLoading || product.stock <= 0}
              className={`w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-6 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 ${
                cartLoading ? "opacity-75 cursor-not-allowed" : ""
              } ${product.stock <= 0 ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              {cartLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FiShoppingCart className="w-5 h-5" />
                  {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
                </>
              )}
            </motion.button>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-4">
                {product.category && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">
                      Category
                    </h4>
                    <p className="text-gray-800 capitalize">
                      {product.category}
                    </p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium text-gray-500">
                    Availability
                  </h4>
                  <p
                    className={`font-medium ${
                      product.stock > 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} ${
                          product.stock === 1 ? "item" : "items"
                        } available`
                      : "Out of Stock"}
                  </p>
                </div>
                {product.brand && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Brand</h4>
                    <p className="text-gray-800">{product.brand}</p>
                  </div>
                )}
                {product.sku && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">SKU</h4>
                    <p className="text-gray-800">{product.sku}</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
