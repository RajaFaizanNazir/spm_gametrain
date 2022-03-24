const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const HttpError = require("../util/http-error");
const User = require("../models/user");

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({ users: users });
};
const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password, dob } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later.",
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
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    dob,
  });

  try {
    await createdUser.save();
  } catch (err) {
    console.log(createdUser);
    const error = new HttpError(
      "Signing up failed while saving, please try again later",
      500
    );
    return next(error);
  }

  res.status(201).json({ userId: createdUser.id, email: createdUser.email });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later.",
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
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      "Could not log you in, please check your credentials and try again.",
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
const updateDOB = async (req, res, next) => {
  const { email, dob } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again.",
      500
    );
    return next(error);
  }
  try {
    User.updateOne({ email: email }, { dob: dob });
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res.status(201).json({ email: existingUser.email, dob: existingUser.dob });
};
const updatePassword = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again.",
      500
    );
    return next(error);
  }
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
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
exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.updateDOB = updateDOB;
exports.updatePassword = updatePassword;
