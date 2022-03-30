const express = require("express");
/**************************************** */
const usersController = require("../controllers/users-controllers");
const adminController = require("../controllers/admin-controllers");
const taskUtils = require("../controllers/task-controllers");
const requestUtils = require("../controllers/request-controllers");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/users", usersController.getUsers);
/**************************************** */
router.get("/admins", adminController.getAdmins);
/**************************************** */
router.get("/viewTasks", taskUtils.getTasks);
/**************************************** */
router.get("/viewRequests", requestUtils.getRequest);
/**************************************** */
router.post(
  "/userByEmail",
  validator.emailValidator(),
  usersController.getUsersByEmail
);
/**************************************** */
router.post(
  "/adminByEmail",
  validator.emailValidator(),
  adminController.getAdminByEmail
);
/**************************************** */
router.post("/addUser", validator.credentialsValidator(), usersController.signup);
/**************************************** */
router.post("/signup", validator.credentialsValidator(), adminController.signup);
/**************************************** */
router.post("/login", validator.credentialsValidator(), adminController.login);
/**************************************** */
router.post(
  "/updateUserPosition",
  validator.positionValidator(),
  usersController.updatePosition
);
/**************************************** */
router.post(
  "/updateUserPassword",
  validator.credentialsValidator(),
  usersController.updatePassword
);
/**************************************** */
module.exports = router;
/**************************************** */
