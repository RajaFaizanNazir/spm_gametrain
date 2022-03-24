const express = require("express");
const { check } = require("express-validator");
/**************************************** */
const usersController = require("../controllers/users-controllers");
const taskUtils = require("../util/task-utils");
const requestUtils = require("../util/request-utils");
/**************************************** */
const router = express.Router();
/**************************************** */
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
/**************************************** */
router.post("/login", usersController.login);
/**************************************** */
router.post("/updatePosition", usersController.updatePosition);
/**************************************** */
router.post("/updatePassword", usersController.updatePassword);
/**************************************** */
router.post("/createTask", taskUtils.createTask);
/**************************************** */
router.post("/requestForApproval", requestUtils.requestForApproval);
/**************************************** */
module.exports = router;
