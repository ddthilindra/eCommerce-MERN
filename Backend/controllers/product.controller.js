const Product = require("../models/product.model");
const messages = require("../messages/messages");

const image = "not found";

exports.addProduct = async function (req, res) {
  console.log(req.body);
//   console.log(req.files.thumbnailResult[0].filename)

  const product = new Product({
    name: req.body.name,
    quantity: req.body.quantity,
    sku: req.body.sku,
    thumbnailResult: `http://localhost:8000/uploads/${req.files.thumbnailResult[0].filename}` || image,
    imageResult: `http://localhost:8000/uploads/${req.files.imageResult[0].filename}` || image,
    description: req.body.description,
    createdBy: req.jwt.sub.id,
  });
  try {
    console.log(product);
     await product.save();

    res.status(200).json({
      code: 200,
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getProductById = async function (req, res) {
  try {
    const id = req.params.id;
    const product = await Product.findById(id);
    console.log(product);
    if (!product) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No product found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: product,
        message: `Product is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getProductByUserId = async function (req, res) {
  try {
    const id = req.jwt.sub.id;
    const product = await Product.find({ createdBy: id });
    console.log(product);
    if (!product) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No product found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: product,
        message: `Product is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.searchProductByName = async function (req, res) {
  try {
    const searchName = req.query.name;
    const product = await Product.find({name:{$regex:searchName,$options:'$i'}});
    console.log(product);
    if (product.length === 0) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No product found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: product,
        message: `Product is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
exports.getProductByCategory = async function (req, res) {
  try {
    const category = req.params.category;
    console.log(category);
    const product = await Product.find({ category: category });
    console.log(product);
    if (!product) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No product found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: product,
        message: `Product is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getAllProduct = async function (req, res) {
  Product.find()
    .then((data) => {
      return res.status(200).json({
        code: 200,
        success: true,
        data: data,
        message: "Product are received",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving product.",
      });
    });
};

exports.updateProductById = async function (req, res) {
  try {

    let product = await Product.findById(req.params.id);

    const data = {
        name: req.body.name || product.name,
        quantity: req.body.quantity|| product.quantity,
        sku: req.body.sku|| product.sku,
        thumbnailResult: `http://localhost:8000/uploads/${req.files.thumbnailResult[0].filename}` || product.thumbnailResult,
        imageResult: `http://localhost:8000/uploads/${req.files.imageResult[0].filename}` || product.imageResult,
        description: req.body.description || product.description,
        createdBy: req.jwt.sub.id,
    };
    // console.log(data);
    product = await Product.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      code: 200,
      success: true,
      data: product,
      message: "Product Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.deleteProductById = async function (req, res) {
  try {
    const id = req.params.id;
    var product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({
        code: 200,
        success: true,
        data: product,
        message: "Product deleted successfully",
      });
    } else {
      res.status(500).json({
        code: 500,
        success: true,
        message: "Already deleted this product or invalid product id",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
