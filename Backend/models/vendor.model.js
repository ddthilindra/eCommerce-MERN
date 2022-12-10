const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var Schema = mongoose.Schema;

const vendorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: { 
        type: String,
        default: null,
        required: false,
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    mobile: {
        type: String,
    },
    type: {
        type: String,
    },
});

vendorSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


const Vendor = mongoose.model("vendor", vendorSchema);

module.exports = Vendor; 