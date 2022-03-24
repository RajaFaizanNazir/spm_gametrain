const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
const adminController = require("../controllers/admin-controllers");

const router = express.Router();


router.get("/", adminController.getUsers);

router.post(
  "/addUser",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signup
);

router.post("/signup", adminController.signup);

router.post("/login", adminController.login);

router.post("/updateUserPosition", usersController.updatePosition);

router.post("/updateUserPassword", usersController.updatePassword);

module.exports = router;
