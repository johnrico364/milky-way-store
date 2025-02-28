const path = require("path");
const Product = require("../models/productSchema");
const fs = require("fs");

const createProduct = async (req, res) => {
  const product = JSON.parse(req.body.product);
  const productImage = req?.file?.filename;

  if (productImage === undefined) {
    return res.status(400).json({ error: "Product image required" });
  }

  try {
    const data = await Product.create({
      ...product,
      isDeleted: false,
      picture: productImage,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find({ isDeleted: false }).sort({
      createdAt: -1,
    });

    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOneProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateProduct = async (req, res) => {
  const id = req.params.id;
  const newProduct = JSON.parse(req.body.product);
  const productImg = req.file?.filename;
  const oldImg = JSON.parse(req.body.oldPic);

  try {
    const filePath = path.join("../client/src/images/product", oldImg);
    productImg && fs.unlink(filePath, (err) => console.log("Error"));

    const data = await Product.findByIdAndUpdate(id, {
      ...newProduct,
      picture: productImg,
    });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await Product.findByIdAndUpdate(id, { isDeleted: true });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const dataResetProduct = async (req, res) => {
  try {
    const data = await Product.deleteMany();
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getOneProduct,
  updateProduct,
  deleteProduct,
  dataResetProduct,
};
