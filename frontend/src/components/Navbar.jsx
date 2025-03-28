import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../services/authAPI";
import { FiMenu, FiX, FiSearch, FiUser, FiShoppingCart, FiLogOut } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          <Link to="/">Gadgets Zone</Link>
        </motion.div>


        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/products" className="hover:text-gray-300 transition">Products</Link>
          <Link to="/orders" className="hover:text-gray-300 transition">Orders</Link>
          <Link to="/cart" className="hover:text-gray-300 transition flex items-center">
            <FiShoppingCart className="mr-1" /> Cart
          </Link>
          <Link to="/wishlist" className="hover:text-gray-300 transition">Wishlist</Link>

          {/* User Dropdown */}
          {user ? (
            <div className="relative">
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-md"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <FiUser className="text-xl" />
                <span>{user.name}</span>
              </motion.button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-48 bg-white text-gray-800 shadow-lg rounded-md py-2 z-50"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 hover:bg-gray-200 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-yellow-600 hover:bg-gray-200 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-200 transition"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-full hover:scale-105 transition-transform">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center space-y-4 py-4 bg-gray-800"
          >
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>

            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
                {user.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-red-500">Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
