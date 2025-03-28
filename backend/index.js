const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require('./routes/wishlistRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
const vendorProductRoutes = require('./routes/vendorProductRoutes');
const session = require("express-session");

const app = express();
app.use(
  session({
    secret:
      "8eb0a026e3c6fa44da425af207e4b754e5482e8bf0f760d1a5c9f0a4fdbe2029fa4dbfe59f64cb59a2a6e6998370aa8bee57929effe543347f6e6f29a25efa26", // Change this to a long random string
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to true if using HTTPS
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
// Add this near your other route imports
const migrateRoutes = require('./routes/migrations');
app.use('/migrate', migrateRoutes);
// Add this near your other app.use() routes
app.use('/api/wishlist', wishlistRoutes);
// In your main server file (e.g., server.js or app.js)

app.use('/api/vendors', vendorRoutes);
app.use('/api/vendor-products', vendorProductRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
