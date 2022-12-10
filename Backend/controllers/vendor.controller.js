const Vendor = require("../models/vendor.model");

const image = "not found";

const utils = require("../lib/utils");
const jsonwebtoken = require("jsonwebtoken");

const bcrypt = require("bcrypt");
const { userRegistrationValidation, loginValidate } = require("../validation");

exports.addVendor = async function (req, res) {
  const body = req.body;

  const { error } = userRegistrationValidation({
    ...body,
  });
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });

  const emailExist = await Vendor.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(200)
      .json({ code: 200, success: true, message: "Email already available" });

  const vendor = new Vendor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    mobile: req.body.mobile,
    type: "Vendor",
  });
  try {
    var savedVendor = await vendor.save();
    const token = utils.generateAuthToken(savedVendor);
    res.status(200).json({
      code: 200,
      success: true,
      token: token,
      message: "Registered in successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.loginVendor = async function (req, res) {
  try {
    const { error } = loginValidate(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });

    const vendor = await Vendor.findOne({ email: req.body.email }).select(
      "+password"
    );
    if (!vendor)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Email" });

    const validPassword = await bcrypt.compare(
      req.body.password,
      vendor.password
    );

    if (!validPassword)
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Invalid Password" });
    const token = utils.generateAuthToken(vendor);
    res.status(200).json({
      code: 200,
      success: true,
      token: token,
      message: "logged in successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.forgotPassword = async function (req, res, next) {
  const { email } = req.body;
  try {
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res
        .status(200)
        .json({ code: 200, success: false, message: "Vendor not found" });
    }

    const token = utils.generateAuthToken(vendor);

    sendForgotEmail(token.token, vendor);
    res.status(200).json({
      code: 200,
      success: true,
      data: "Please check your email to reset password.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.resetPassword = async function (req, res) {
  try {
    if (req.query.token) {
      const tokenParts = req.query.token.split(" ");

      if (
        tokenParts[0] === "Bearer" &&
        tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
      ) {
        try {
          const verification = jsonwebtoken.verify(
            tokenParts[1],
            process.env.ACCESS_TOKEN_SECRET
          );
          const vendor = await Vendor.findOne({
            email: verification.sub.email,
          });
          if (!vendor) {
            return res.status(200).json({
              code: 200,
              success: false,
              status: "Unauthorized",
              msg: "Token is invalid. Please contact Administrator",
            });
          }
          vendor.password = req.body.password;
          await vendor.save();
          const token = utils.generateAuthToken(vendor);
          res.status(200).json({
            code: 200,
            success: true,
            data: vendor,
            token: token,
            message: "Password reset successfully",
          });
        } catch (err) {
          res.status(200).json({
            code: 200,
            success: false,
            status: "Unauthorized1",
            msg: "Can't reset your password. Please contact Administrator",
          });
        }
      } else {
        res.status(200).json({
          code: 200,
          success: false,
          status: "Unauthorized2",
          msg: "Can't reset your password. Please contact Administrator",
        });
      }
    } else {
      res.status(200).json({
        code: 200,
        success: false,
        status: "TokenError",
        msg: "Can't reset your password. Please contact Administrator",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getAllVendors = async function (req, res) {
  Vendor.find()
    .then((data) => {
      return res.status(200).json({
        code: 200,
        success: true,
        data: data,
        message: "Vendors are received",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving vendor.",
      });
    });
};

exports.updateVendorByID = async function (req, res) {
  try {
    let vendor = await Vendor.findById(req.params.id);

    const data = {
      userName: req.body.userName || vendor.userName,
      email: req.body.email || vendor.email,
      language: req.body.language || vendor.language,
      about: req.body.about || vendor.about,
      fcm_token: req.body.fcm_token || vendor.fcm_token,
    };

    console.log("data", data);
    vendor = await Vendor.findByIdAndUpdate(req.params.id, data, { new: true });
    res.status(200).json({
      code: 200,
      success: true,
      data: vendor,
      message: "Vendor Updated Successfully!",
    });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.getVendorById = async function (req, res) {
  try {
    const email = req.body.email;
    const vendor = await Vendor.findOne({ email });
    if (!vendor) {
      return res.status(200).json({
        code: 200,
        success: false,
        message: `No valid vendor with this email : ${email}`,
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: true,
        message: `Vendor with this email : ${email}`,
        data: vendor,
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};
