const HttpError = require("../util/http-error");
const Admin = require("../models/admin");
const confidential = require("../middleware/confidential");
/**************************************** */
const getAdmins = async (req, res, next) => {
  let admins;
  try {
    admins = await Admin.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching Admins failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ Admins: admins });
};
/**************************************** */
const getAdminByEmail = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { email } = req.body;
  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }

  if (!existingAdmin) {
    const error = new HttpError("Invalid Email, Not found.", 403);
    return next(error);
  }
  res.json({
    ID: existingAdmin.id,
    email: existingAdmin.email,
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

  const { name, email, password } = req.body;

  let existingAdmin;
  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Signing up failed, please try again later." + err,
      500
    );
    return next(error);
  }

  if (existingAdmin) {
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
      "Could not create user, please try again." + err,
      500
    );
    return next(error);
  }

  const createdAdmin = new Admin({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await createdAdmin.save();
  } catch (err) {
    const error = new HttpError(
      "Signing up failed while saving, please try again later" + err,
      500
    );
    return next(error);
  }

  res.status(201).json({ AdminId: createdAdmin.id, email: createdAdmin.email });
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

  let existingAdmin;

  try {
    existingAdmin = await Admin.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Logging in failed, please try again later." + err,
      500
    );
    return next(error);
  }

  if (!existingAdmin) {
    const error = new HttpError(
      "Invalid credentials, could not log you in.",
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = confidential.isSame(password, existingAdmin.password);
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
    AdminId: existingAdmin.id,
    email: existingAdmin.email,
  });
};
/**************************************** */
module.exports = {
  login,
  signup,
  getAdmins,
  getAdminByEmail,
};
/**************************************** */
