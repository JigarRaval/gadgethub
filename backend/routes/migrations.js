const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/migrate-product-ids', async (req, res) => {
  try {
    const products = await Product.find();
    for (let i = 0; i < products.length; i++) {
      products[i].numericId = i + 1;
      await products[i].save();
    }
    res.json({ success: true, migrated: products.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;