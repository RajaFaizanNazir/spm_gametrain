console.log("./admin-routes.js");
const express = require("express");
const utils = require("../utils/responses.js");
const router = express.Router();
const adminController = require("../controller/admin-controller.js");
const validator = require("../middleware/validate.js");

router.get("/admin", utils.invalidRequest);

router.get("/admin/add", adminController.addGet);

router.post(
  "/admin/add",
  validator.adminAddValidator(),
  adminController.addPost
);

module.exports = router;
