console.log("./validate.js");
const { body, validationResult } = require("express-validator");
const credentialsValidator = () => {
  return [
    body("userid").exists().isEmail(),
    body("password").exists().isLength({ min: 5 }),
  ];
};

const adminAddValidator = () => {
  return [
    body("id").exists().isNumeric(),
    body("name").exists(),
    body("company").exists(),
    body("quantity").exists().isNumeric(),
    body("price").exists().isNumeric(),
  ];
};
module.exports = {
  credentialsValidator,
  adminAddValidator,
  validationResult,
};
