const express = require("express");
const { check } = require("express-validator");
/**************************************** */
const usersController = require("../controllers/users-controllers");
const adminController = require("../controllers/admin-controllers");
const taskUtils = require("../util/task-utils");
const requestUtils = require("../util/request-utils");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/", adminController.getUsers);
/**************************************** */
router.post(
  "/addUser",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);
/**************************************** */
router.post("/signup", adminController.signup);
/**************************************** */
router.post("/login", adminController.login);
/**************************************** */
router.post("/updateUserPosition", usersController.updatePosition);
/**************************************** */
router.post("/updateUserPassword", usersController.updatePassword);
/**************************************** */
router.get("/viewTasks", taskUtils.getTasks);
/**************************************** */
router.get("/viewRequests", requestUtils.getRequest);
/**************************************** */
module.exports = router;
