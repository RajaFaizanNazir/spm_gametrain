console.log("./clint-routes.js");
const clintController = require("../controller/clint-controller.js");
const utils = require("../utils/responses.js");
const express = require("express");
const router = express.Router();
router.get("/", utils.invalidRequest);
const validator = require("../middleware/validate.js");

router.get("/clint", utils.invalidRequest);

router.get("/clint/signup", clintController.signupGet);

router.post(
  "/clint/signup",
  validator.credentialsValidator(),
  clintController.signupPost
);

router.get("/clint/changePassword", clintController.signupGet);

router.post(
  "/clint/changePassword",
  validator.credentialsValidator(),
  clintController.signupPost
); // Check my structure of JSON, it will override previous data/Password

router.get("/clint/login", clintController.loginGet);

router.post(
  "/clint/login",
  validator.credentialsValidator(),
  clintController.loginPost
);

router.get("/clint/view", clintController.view);

router.get("/clint/view/product", clintController.searchBy);

router.get("/clint/view/product/priceRage", clintController.searchByPriceRange);

module.exports = router;
