const mongoose = require('mongoose');

// Define the clothing product schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  size: {
    type: String,
    default: null  // Optional field
  },
  color: {
    type: String,
    default: null  // Optional field
  },
  imgUrl: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
  },
  tags: {
    type: [String],  // Array of strings for product tags
    default: []
  },
  availability: {
    type: String,
    default: 'inStock'
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0  // Discount in percentage, optional
  },
  brand: {
    type: String,
    default: null  // Optional field for brand name
  },
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt fields
});

// Create and export the model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
