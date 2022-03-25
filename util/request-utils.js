const validator = require("../middleware/validate");
const Request = require("../models/request");
const User = require("..//models/user");
const HttpError = require("../util/http-error");
/**************************************** */
const requestForApproval = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { devComments, taskId } = req.body;

  const createdRequest = new Request({
    devComments,
    taskId,
  });

  try {
    await createdRequest.save();
  } catch (err) {
    console.log(createdRequest);
    const error = new HttpError(
      "Error creating Request, please try  again later" + err,
      500
    );
    return next(error);
  }

  res.status(201).json({
    taskId: createdRequest.taskId,
    devComments: createdRequest.devComments,
  });
};
/**************************************** */
const getRequest = async (req, res, next) => {
  let request;
  try {
    request = await Request.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching Requests failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ Requests: request });
};
/**************************************** */
const getRequestsFrom = async (req, res, next) => {
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
  let existingRequest;
  try {
    existingRequest = await Request.find({ from: existingUser.id });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingRequest) {
    const error = new HttpError("No Task found.", 403);
    return next(error);
  }
  res.json({
    Task: existingRequest,
  });
};
/**************************************** */
const getRequestsFor = async (req, res, next) => {
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
  let existingRequest;
  try {
    existingRequest = await Request.find({ for: existingUser.id });
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingRequest) {
    const error = new HttpError("No Task found.", 403);
    return next(error);
  }
  res.json({
    Task: existingRequest,
  });
};
/**************************************** */
module.exports = {
  requestForApproval,
  getRequest,
  getRequestsFrom,
  getRequestsFor,
};
/**************************************** */
