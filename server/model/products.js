const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    

    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Electronics",
        "Fashion",
        "Home",
        "Beauty",
        "Sports",
        "Books",
        "Other",
      ],
      default: "Other",
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },



 


  badges: {
  type: String,
  enum: [
    "Best Seller",
    "Limited Edition",
    "Exclusive",
    "New Arrival"
  ],
  default: null,
},

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    sold: {
      type: Number,
      default: 0,
      min: 0,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Low Stock", "Out of Stock"],
      default: "Active",
    },

  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;