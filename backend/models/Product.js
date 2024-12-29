const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    sizes: [String],
    images: [String],
    rating: { type: Number, default: 0 },  // Add rating field
    madeFrom: String,                     // Add madeFrom field (e.g., material or ingredients)
    category: String,                     // Add category (e.g., perfume, skincare, etc.)
    brand: String,                        // Add brand field
  });
  
  module.exports = mongoose.model("Product", productSchema);
  