const Product = require("../models/productModel");

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new product
exports.createProduct = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    newProduct.save();
    return res.status(201).json({ message: "add sucessfull" });
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};
