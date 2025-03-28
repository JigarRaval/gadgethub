const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin"); // You'll need to create this model

const adminAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findOne({
      _id: decoded.id,
      "tokens.token": token,
    });

    if (!admin) {
      throw new Error();
    }

    req.token = token;
    req.admin = admin;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate as an admin" });
  }
};

module.exports = adminAuth;
