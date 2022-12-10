const Favorite = require("../models/favorite.model");
const messages = require("../messages/messages");

const image = "not found";

exports.addFavorite = async function (req, res) {

  const vid = await Favorite.findOne({ vendorId: req.jwt.sub.id });
  // console.log(vid._id)
  if(!vid){
    const favorite = new Favorite({
      vendorId: req.jwt.sub.id,
      favProducts: req.body.favProducts,    
    });
    try {
      // console.log(favorite);
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
    try{
      const favorite = await Favorite.findByIdAndUpdate(vid._id, { $push: { favProducts: req.body.favProducts } })
      
      console.log(favorite)
      // console.log("first",favorite.favProducts.length)
      res.status(200).json({
        code: 200,
        success: true,
        data: favorite,
        message: "Favorite Updated Successfully!",
      });
    } catch (err) {
      res
        .status(500)
        .json({ code: 500, success: false, message: err });
    }
  }
  
};

exports.getFavoriteById = async function (req, res) {
  try {
    const id = req.jwt.sub.id;
    // console.log(id)
    const favorite = await Favorite.findOne({ vendorId: id });

    // console.log(favorite);
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



exports.removeFavoriteById = async function (req, res) {
  try {
    const id = req.jwt.sub.id;
    // console.log(id)
    const favorite = await Favorite.findOne({ vendorId: id });
   
    // console.log(favorite);
    if (!favorite) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No favorite found!`,
      });
    } else {
      try{
        console.log(req.body.removeProducts)

        const vid = await Favorite.findOne({ vendorId: req.jwt.sub.id });        

        const index = vid.favProducts.indexOf(req.body.removeProducts);
        // console.log(index)
        if (index > -1) { 
          vid.favProducts.splice(index, 1); 
        }

        // console.log(vid.favProducts);
        
        const favorite = await Favorite.findByIdAndUpdate(vid._id,  { favProducts: vid.favProducts } )
        // console.log(favorite.favProducts.length)
     
        res.status(200).json({
          code: 200,
          success: true,
          data: favorite,
          message: "Favorite Updated Successfully!",
        });
      } catch (err) {
        res
          .status(500)
          .json({ code: 500, success: false, message: err });
      }
    }

    
    // var favorite = await Favorite.findByIdAndDelete(id);
    // if (favorite) {
    //   res.status(200).json({
    //     code: 200,
    //     success: true,
    //     data: favorite,
    //     message: "Favorite deleted successfully",
    //   });
    // } else {
    //   res.status(500).json({
    //     code: 500,
    //     success: true,
    //     message: "Already deleted this favorite or invalid favorite id",
    //   });
    // }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
