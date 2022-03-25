const { body, validationResult } = require("express-validator");
/**************************************** */
const credentialsValidator = () => {
  return [
    body("email").exists().isEmail(),
    body("password").exists().isLength({ min: 5 }),
  ];
};
/**************************************** */
const taskValidator = () => {
  return [body("title").exists(), body("description").exists()];
};
/**************************************** */
const positionValidator = () => {
  return [
    body("email").exists().isEmail(),
    body("position").exists().isIn(["PM", "DEV"]),
  ];
};
/**************************************** */
const requestValidator = () => {
  return [body("devComments").exists(), body("taskId").exists()];
};
/**************************************** */
module.exports = {
  credentialsValidator,
  taskValidator,
  positionValidator,
  requestValidator,
  validationResult,
};
/**************************************** */