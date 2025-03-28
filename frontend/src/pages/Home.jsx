import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  // Function to add product to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const carouselImages = [
    {
      src: "https://files.oaiusercontent.com/file-Rmn8j9PtyRjgqVH6hvrTSW?se=2025-03-27T12%3A44%3A39Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D11704589-7e07-4352-8794-63f7c0e7df01.webp&sig=CBirVGgvNAQAeTj3SasgquLhTP9RCXL3UpjFQSIRAiU%3D",
      alt: "GADGETS - Ultimate Experience",
    },
    {
      src: "https://images.macrumors.com/article-new/2019/02/MR-Future-Products-2020-2.png",
      alt: "Latest Products - Cutting-Edge Technology",
    },
    {
      src: "https://decider.com/wp-content/uploads/2021/02/Oculus-Quest-2-.jpg?quality=90&strip=all&w=1284&h=856&crop=1",
      alt: "VR Gaming - Step into the Future",
    },
    {
      src: "https://img.freepik.com/premium-vector/3d-banner-realistic-accessories-mobile-game-console-controller-headphones-joystick-smart-watches_555677-523.jpg?w=996",
      alt: "Advanced VR Headsets - Next Level Immersion",
    },
  ];

  const trendingProducts = [
    {
      id: 1,
      _id: "1",
      name: "Smartwatch Series X",
      price: 129.99,
      description: "Advanced smartwatch with health monitoring and GPS tracking",
      image:"https://images.unsplash.com/photo-1542541864-4abf21a55761?q=80&w=1003&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "wearables",
    },
    {
      id: 2,
      _id: "2",
      name: "Wireless Earbuds Pro",
      price: 89.99,
      description: "Premium noise-cancelling wireless earbuds with 24h battery",
      image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=989&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "audio",
    },
    {
      id: 3,
      _id: "3",
      name: "4K Action Camera",
      price: 199.99,
      description: "Waterproof action camera with 4K/60fps video recording",
      image: "https://images.unsplash.com/photo-1606986628470-26a67fa4730c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "cameras",
    },
    {
      id: 4,
      _id: "4",
      name: "Gaming Mouse RGB",
      price: 49.99,
      description: "High-precision gaming mouse with customizable RGB lighting",
      image: "https://images.unsplash.com/photo-1628832307345-7404b47f1751?q=80&w=1183&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "accessories",
    },
    {
      id: 5,
      _id: "5",
      name: "Portable Bluetooth Speaker",
      price: 59.99,
      description: "Waterproof Bluetooth speaker with 20h playtime",
      image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "audio",
    },
  ];

  const saleProducts = [
    {
      id: 6,
      _id: "6",
      name: "Latest 5G Smartphone",
      oldPrice: 999.99,
      price: 799.99,
      description: "Flagship smartphone with 5G, 120Hz display, and triple camera",
      image: "https://images.unsplash.com/photo-1575695342320-d2d2d2f9b73f?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "phones",
    },
    {
      id: 7,
      _id: "7",
      name: "Gaming Console Pro",
      oldPrice: 599.99,
      price: 499.99,
      description: "Next-gen gaming console with 4K HDR and ray tracing",
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=1227&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "gaming",
    },
    {
      id: 8,
      _id: "8",
      name: "VR Headset",
      oldPrice: 349.99,
      price: 249.99,
      description: "Immersive VR headset with 6DOF tracking and controllers",
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "gaming",
    },
    {
      id: 9,
      _id: "9",
      name: "Smart Home Hub",
      oldPrice: 199.99,
      price: 149.99,
      description: "Control your smart home devices with voice commands",
      image: "https://images.unsplash.com/photo-1568910748155-01ca989dbdd6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      category: "smart-home",
    },
  ];

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen">
    
     {/* Carousel Section */}
<section className="relative w-full h-[30vh] md:h-[50vh] overflow-hidden">
  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/60 to-transparent z-10" />
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    interval={5000}
    className="relative z-0"
  >
    {carouselImages.map((image, index) => (
      <div key={index} className="relative w-full h-[20vh] md:h-[50vh] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-10" />
        <img
          src={image.src}
          alt={image.alt}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-10 left-10 text-white z-20 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-bold max-w-md"
          >
            {image.alt}
          </motion.h2>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg transition"
            onClick={() => navigate('/products')}
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    ))}
  </Carousel>
</section>

      {/* Trending Products */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-6">🔥 Trending Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={() => navigate(`/product/${product.id}`, { state: { product } })}
            />
          ))}
        </div>
      </section>

      {/* Sale Products */}
      <section className="container mx-auto py-12 px-6 bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 text-white rounded-lg">
        <h2 className="text-3xl font-bold text-center">💥 Limited Time Deals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {saleProducts.map((product) => (
            <ProductCard 
              key={product.id}
              product={product}
              onAddToCart={addToCart}
              onViewDetails={() => navigate(`/product/${product.id}`, { state: { product } })}
            />
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Electronics", icon: "📱", category: "electronics" },
            { name: "Audio", icon: "🎧", category: "audio" },
            { name: "Wearables", icon: "⌚", category: "wearables" },
            { name: "Gaming", icon: "🎮", category: "gaming" },
          ].map((cat) => (
            <motion.div
              key={cat.category}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleCategoryClick(cat.category)}
              className="bg-white p-6 rounded-lg shadow-md text-center cursor-pointer"
            >
              <span className="text-4xl mb-2 block">{cat.icon}</span>
              <h3 className="text-xl font-semibold">{cat.name}</h3>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
