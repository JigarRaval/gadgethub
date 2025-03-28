import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-500 text-white flex mt-10 h-20 px-20 items-center justify-between "
    >
      <div className="container">
        
       

        {/* 🔗 Quick Links */}
        <div className="flex space-x-6 text-sm font-medium">
          <Link to="/products" className="hover:text-yellow-300 transition duration-300">Shop</Link>
          <Link to="/about" className="hover:text-yellow-300 transition duration-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300 transition duration-300">Contact</Link>
          <Link to="/faq" className="hover:text-yellow-300 transition duration-300">FAQs</Link>
        </div>

        {/* 🌐 Social Media Icons */}
      
      </div>

      {/* 🔰 Copyright */}
      <div className="text-center text-xs opacity-90  text-white/80">
        &copy; {new Date().getFullYear()} <span className="font-semibold text-yellow-300">GadgetZone</span>. All rights reserved.
      </div>
    </motion.footer>
  );
};

export default Footer;
