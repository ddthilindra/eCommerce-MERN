const routes = require("express").Router();
const upload = require("../../lib/multerConfig");
const utils = require("../../lib/utils");
const ProductController = require("../../controllers/product.controller");

routes.post("/addProduct" ,utils.authMiddleware, upload.fields([{name:'thumbnailResult'},{name:'imageResult'}]),ProductController.addProduct);
routes.get("/getAllProduct", ProductController.getAllProduct);
routes.get("/getProductById/:id", ProductController.getProductById);
routes.get("/searchProductByName/", ProductController.searchProductByName);
routes.put("/updateProductById/:id",utils.authMiddleware, upload.fields([{name:'thumbnailResult'},{name:'imageResult'}]), ProductController.updateProductById);
routes.delete("/deleteProductById/:id", ProductController.deleteProductById);

module.exports = routes;
