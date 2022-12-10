const routes = require("express").Router();
const utils = require("../../lib/utils");
const VendorController = require("../../controllers/vendor.controller");

routes.post("/addVendor", VendorController.addVendor);
// routes.put("/updateEditor/:id", utils.authMiddleware, EditorController.updateEditorByID);
routes.post("/login", VendorController.loginVendor);
// routes.get("/getAllEditors", utils.authMiddleware, EditorController.getAllEditors);

module.exports = routes;
