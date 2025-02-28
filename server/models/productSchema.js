const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    supplier: { type: String, required: true },
    description: { type: String, required: true },
    stocks: { type: Number, required: true },
    picture: { type: String, required: true },
    isDeleted: { type: Boolean, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
