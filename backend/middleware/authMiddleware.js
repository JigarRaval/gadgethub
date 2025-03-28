const Vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Not authorized as an admin" });
  }
};

const vendorAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const vendor = await Vendor.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!vendor) {
      throw new Error();
    }

    // Check if vendor is approved
    if (!vendor.approved) {
      return res.status(403).send({ error: "Vendor account not approved yet" });
    }

    req.token = token;
    req.vendor = vendor;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate as a vendor" });
  }
};


module.exports = { protect, admin, vendorAuth };
