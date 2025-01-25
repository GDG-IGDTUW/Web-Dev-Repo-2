const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > 0; // Price must be greater than 0
        },
        message: 'Price must be greater than 0',
      },
    },
    category: {
        type: String,
        required: true,
        enum: ['Men', 'Women', 'Kids', 'Accessories', 'Footwear', 'Unisex'], // Clothing-related categories
      },
    brand: {
      type: String,
    },
    stock: {
      type: Number,
    //   required: true,
      default: 0,
    },
    images: [
      {
        type: String,
        // required: true,
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'auth', // Reference to the auth User model
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);


productSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
