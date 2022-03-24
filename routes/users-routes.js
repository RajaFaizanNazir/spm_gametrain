const express = require("express");
/**************************************** */
const usersController = require("../controllers/users-controllers");
const taskUtils = require("../util/task-utils");
const requestUtils = require("../util/request-utils");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.post("/signup", validator.credentialsValidator, usersController.signup);
/**************************************** */
router.post("/login", validator.credentialsValidator, usersController.login);
/**************************************** */
router.post("/updatePosition", usersController.updatePosition);
/**************************************** */
router.post(
  "/updatePassword",
  validator.credentialsValidator,
  usersController.updatePassword
);
/**************************************** */
router.post("/createTask", taskUtils.createTask);
/**************************************** */
router.post("/requestForApproval", requestUtils.requestForApproval);
/**************************************** */
router.get("/viewTasks", taskUtils.getTasks);
/**************************************** */
router.get("/viewRequests", requestUtils.getRequest);
/**************************************** */
module.exports = router;
