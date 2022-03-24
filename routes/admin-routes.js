const express = require("express");
/**************************************** */
const usersController = require("../controllers/users-controllers");
const adminController = require("../controllers/admin-controllers");
const taskUtils = require("../util/task-utils");
const requestUtils = require("../util/request-utils");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/", adminController.getUsers);
/**************************************** */
router.post("/addUser", validator.credentialsValidator, usersController.signup);
/**************************************** */
router.post("/signup", validator.credentialsValidator, adminController.signup);
/**************************************** */
router.post("/login", validator.credentialsValidator, adminController.login);
/**************************************** */
router.post("/updateUserPosition", usersController.updatePosition);
/**************************************** */
router.post(
  "/updateUserPassword",
  validator.credentialsValidator,
  usersController.updatePassword
);
/**************************************** */
router.get("/viewTasks", taskUtils.getTasks);
/**************************************** */
router.get("/viewRequests", requestUtils.getRequest);
/**************************************** */
module.exports = router;
