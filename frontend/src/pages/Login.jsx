import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authAPI";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const userData = await loginUser({ email, password });
    setLoading(false);

    if (userData) {
      if (rememberMe) localStorage.setItem("userInfo", JSON.stringify(userData));
      setUser(userData);
      navigate("/");
    } else {
      alert("Invalid email or password");
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
        <h2 className="text-2xl font-bold text-center text-gray-800">Welcome Back</h2>
        <p className="text-center text-gray-600 mb-4">Login to access your account</p>

        <motion.form onSubmit={handleLogin} className="space-y-4">
          {/* Email Input */}
          <motion.input
            type="email"
            placeholder="Email"
            className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-blue-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />

          {/* Password Input */}
          <motion.input
            type="password"
            placeholder="Password"
            className="border p-3 rounded-lg w-full shadow-sm focus:ring focus:ring-blue-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            whileFocus={{ scale: 1.02 }}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between text-sm text-gray-600">
            <label className="flex items-center space-x-2">
              <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
              <span>Remember Me</span>
            </label>
            <button type="button" className="text-blue-500 hover:underline">Forgot Password?</button>
          </div>

          {/* Login Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full font-semibold shadow-md hover:scale-105 transition-transform disabled:bg-gray-400"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>

          {/* Register Option */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account?{" "}
            <motion.button
              onClick={() => navigate("/register")}
              className="text-blue-500 font-semibold hover:underline"
              whileHover={{ scale: 1.05 }}
            >
              Register
            </motion.button>
          </p>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Login;
