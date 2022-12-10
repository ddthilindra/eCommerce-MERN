const routes = require("express").Router();
const utils = require("../../lib/utils");
const FavoriteController = require("../../controllers/favorite.controller");

routes.post("/addFavorite" ,utils.authMiddleware,FavoriteController.addFavorite);
// routes.get("/getAllProduct", FavoriteController.getAllProduct);
routes.get("/getFavoriteById/",utils.authMiddleware, FavoriteController.getFavoriteById);
// routes.get("/searchProductByName/", FavoriteController.searchProductByName);
// routes.put("/updateProductById/:id",utils.authMiddleware, FavoriteController.updateProductById);
routes.post("/removeProductById/",utils.authMiddleware, FavoriteController.removeFavoriteById);

module.exports = routes;
