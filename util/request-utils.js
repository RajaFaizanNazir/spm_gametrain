const validator = require("../middleware/validate");
const Request = require("../models/request");
const User = require("../models/user");
const Taskutils = require("../util/task-utils");
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
    request = await Request.find()
      .populate("from")
      .populate("for")
      .populate("taskId");
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
    existingRequest = await Request.find({ from: existingUser.id })
      .populate("from")
      .populate("for")
      .populate("taskId");
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
    existingRequest = await Request.find({ for: existingUser.id })
      .populate("from")
      .populate("for")
      .populate("taskId");
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
const acceptRequest = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { id } = req.body;
  let existingTask;
  try {
    existingTask = await Request.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    existingTask = await Request.findOneAndUpdate(
      { id: id },
      { status: "ACCEPTED" },
      {
        new: true,
      }
    );
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  Tid = existingTask.taskId;
  Taskutils.completeTask(Tid, req, res, next);
  res.status(201).json({ Request: existingTask });
};
/**************************************** */
const rejectRequest = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { id } = req.body;
  let existingTask;
  try {
    existingTask = await Request.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    existingTask = await Request.findOneAndUpdate(
      { id: id },
      { status: "REJECTED" },
      {
        new: true,
      }
    );
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res.status(201).json({ Request: existingTask });
};
/**************************************** */
module.exports = {
  requestForApproval,
  getRequest,
  getRequestsFrom,
  getRequestsFor,
  acceptRequest,
  rejectRequest,
};
/**************************************** */
