const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
    check("dob").not().isEmpty(),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

router.post("/updateDOB", usersController.updateDOB);

router.post("/addAddress", usersController.addAddress);

module.exports = router;
