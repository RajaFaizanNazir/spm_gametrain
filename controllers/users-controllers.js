const HttpError = require("../util/http-error");
const User = require("../models/user");
const confidential = require("../middleware/confidential");
const validator = require("../middleware/validate");
/**************************************** */
const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ users: users });
};
/**************************************** */
const getUsersByEmail = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError("Invalid Email, Not found.", 403);
    return next(error);
  }
  res.json({
    ID: existingUser.id,
    email: existingUser.email,
  });
};
/**************************************** */
const signup = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, position } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later." + err,
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User exists already, please login instead.",
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = confidential.encrypt(password);
  } catch (err) {
    const error = new HttpError(
      "Error Encrypting Password, please try again." + err,
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    position,
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed while saving, please try again later" + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};
/**************************************** */
const login = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later." + err,
      500
    );
    return next(error);
  }
  if (!existingUser) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  let isValidPassword = false;
  try {
    isValidPassword = confidential.isSame(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again." +
        err,
      500
    );
    return next(error);
  }
  if (!isValidPassword) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }
  res.json({
    userId: existingUser.id,
    email: existingUser.email,
  });
};
/**************************************** */
const updatePosition = async (req, res, next) => {
  const { email, position } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    User.updateOne({ email: email }, { position: position });
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res
    .status(201)
    .json({ email: existingUser.email, position: existingUser.position });
};
/**************************************** */
const updatePassword = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = confidential.encrypt(password);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    User.updateOne({ email: email }, { password: hashedPassword });
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res.status(201).json({ email: existingUser.email });
};
/**************************************** */
module.exports = {
  signup,
  login,
  updatePosition,
  updatePassword,
  getUsers,
  getUsersByEmail,
};
/**************************************** */
