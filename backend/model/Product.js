const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: [{
    type: String,
    required: true,
  }],
  images: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    default: 0,
  },
 reviews: [
    {
      review: {
        type: String,
        required: true,
        trim: true,
      },
      customer_rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
      },
    },
  ],
});
module.exports = mongoose.model("Product", productSchema);