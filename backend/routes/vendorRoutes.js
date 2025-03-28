const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

// Vendor login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await vendor.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Store vendor ID in session
    req.session.vendorId = vendor._id;

    res.json({
      success: true,
      vendor: {
        id: vendor._id,
        name: vendor.name,
        email: vendor.email,
        companyName: vendor.companyName,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error during login" });
  }
});

// Get vendor profile
router.get("/profile", async (req, res) => {
  try {
    if (!req.session.vendorId) {
      return res.status(401).json({ error: "Please authenticate as a vendor" });
    }

    const vendor = await Vendor.findById(req.session.vendorId).select(
      "-password"
    );
    if (!vendor) {
      return res.status(404).json({ error: "Vendor not found" });
    }

    res.json(vendor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Vendor logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ success: true, message: "Logged out successfully" });
  });
});

module.exports = router;
