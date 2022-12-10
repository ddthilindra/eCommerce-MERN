const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: String,
      required: true,
    },
    sku: {
      type: String,
      required: true,
    },
    thumbnailResult: {
      type: String,
      default: null,
      required: false,
    },
    imageResult: {
      type: String,
      default: null,
      required: false,
    },
    description: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendor',
      required: true,
    },

  },
  { timestamps: true }
);

const Product = mongoose.model("product", productsSchema);

module.exports = Product;
