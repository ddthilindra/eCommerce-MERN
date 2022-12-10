const routes = require("express").Router();

const vendorRoutes = require("./vendorRoute/index");
const adminRoutes = require("./adminRoute/index");
const productRoutes = require("./productRoute/index");

routes.use("/vendor", vendorRoutes);
routes.use("/admin", adminRoutes);
routes.use("/product", productRoutes);
// routes.use("/category", categoryRoutes);

module.exports = routes;
