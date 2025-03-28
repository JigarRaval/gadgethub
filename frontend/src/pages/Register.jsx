import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authAPI";
import { motion } from "framer-motion";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Validate inputs
  const validateForm = () => {
    let errors = {};
    if (name.length < 3) errors.name = "Name must be at least 3 characters long.";
    if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
    if (!/^\d{10}$/.test(phone)) errors.phone = "Phone number must be 10 digits.";
    if (password.length < 6 || !/\d/.test(password) || !/[a-zA-Z]/.test(password))
      errors.password = "Password must be at least 6 characters and include letters and numbers.";
    if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";
    
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Stop if validation fails

    setLoading(true);
    const userData = await registerUser({ name, email, phone, password });
    setLoading(false);

    if (userData) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-center text-gray-600 mb-4">Join us today!</p>

        <motion.form onSubmit={handleRegister} className="space-y-4">
          {/* Name Input */}
          <div>
            <motion.input
              type="text"
              placeholder="Full Name"
              className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-green-300"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Email Input */}
          <div>
            <motion.input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-green-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Number Input */}
          <div>
            <motion.input
              type="tel"
              placeholder="Phone Number"
              className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-green-300"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>

          {/* Password Input */}
          <div>
            <motion.input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-green-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <motion.input
              type="password"
              placeholder="Confirm Password"
              className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-green-300"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              whileFocus={{ scale: 1.02 }}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          {/* Register Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-green-500 text-white px-4 py-2 rounded-lg w-full font-semibold shadow-md hover:scale-105 transition-transform disabled:bg-gray-400"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>

          {/* Already have an account? */}
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <motion.button
              onClick={() => navigate("/login")}
              className="text-green-500 font-semibold hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </motion.button>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;
