const Favorite = require("../models/favorite.model");
const messages = require("../messages/messages");

const image = "not found";

exports.addFavorite = async function (req, res) {

  const vid = await Favorite.findOne({ vendorId: req.jwt.sub.id });
  if(!vid){
    console.log("not")
    const favorite = new Favorite({
      vendorId: req.jwt.sub.id,
      favProducts: req.body.favProducts,    
    });
    try {
      console.log(favorite);
       await favorite.save();
  
      res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: "Favorite created successfully",
      });
    } catch (error) {
      res
        .status(500)
        .json({ code: 500, success: false, message: "Internal Server Error" });
    }
  }else{
    const id=req.jwt.sub.id
    console.log("avl",id)
    try{
      const favorite = await favorite.findByIdAndUpdate(id, { $push: { favProducts: "63948eb7f63c257154337a22" } });
      console.log("first")
      res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: "Product Updated Successfully!",
      });
    } catch (err) {
      res
        .status(500)
        .json({ code: 500, success: false, message: "Internal Server Error" });
    }
  }
  
};

exports.getFavoriteById = async function (req, res) {
  try {
    const id = req.jwt.sub.id;
    console.log(id)
    const favorite = await Favorite.findOne({ vendorId: id });

    console.log(favorite);
    if (!favorite) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No favorite found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: `Favorite is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.searchFavoriteByName = async function (req, res) {
  try {
    const searchName = req.query.name;
    const favorite = await Favorite.find({name:{$regex:searchName,$options:'$i'}});
    console.log(favorite);
    if (favorite.length === 0) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No favorite found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: `Favorite is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
exports.getFavoriteByCategory = async function (req, res) {
  try {
    const category = req.params.category;
    console.log(category);
    const favorite = await Favorite.find({ category: category });
    console.log(favorite);
    if (!favorite) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No favorite found!`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: `Favorite is received`,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getAllFavorite = async function (req, res) {
  Favorite.find()
    .then((data) => {
      return res.status(200).json({
        code: 200,
        success: true,
        data: data,
        message: "Favorite are received",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving favorite.",
      });
    });
};

exports.updateFavoriteById = async function (req, res) {
  try {

    let favorite = await Favorite.findById(req.params.id);

    const data = {
        name: req.body.name || favorite.name,
        quantity: req.body.quantity|| favorite.quantity,
        sku: req.body.sku|| favorite.sku,
        thumbnailResult: `http://localhost:8000/uploads/${req.files.thumbnailResult[0].filename}` || favorite.thumbnailResult,
        imageResult: `http://localhost:8000/uploads/${req.files.imageResult[0].filename}` || favorite.imageResult,
        description: req.body.description || favorite.description,
        createdBy: req.jwt.sub.id,
    };
    // console.log(data);
    favorite = await Favorite.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    res.status(200).json({
      code: 200,
      success: true,
      data: favorite,
      message: "Favorite Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.deleteFavoriteById = async function (req, res) {
  try {
    const id = req.params.id;
    var favorite = await Favorite.findByIdAndDelete(id);
    if (favorite) {
      res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: "Favorite deleted successfully",
      });
    } else {
      res.status(500).json({
        code: 500,
        success: true,
        message: "Already deleted this favorite or invalid favorite id",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
