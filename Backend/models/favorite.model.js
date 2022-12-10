const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const favoriteSchema = new Schema(
  {
    vendorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      required: true,
    },
    favProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: "product",
      },
    ],
  },
  { timestamps: true }
);

const Favorite = mongoose.model("favorite", favoriteSchema);

module.exports = Favorite;
