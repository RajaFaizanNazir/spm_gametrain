const { validationResult } = require("express-validator");
const Request = require("../models/request");
const HttpError = require("../util/http-error");
/**************************************** */
const requestForApproval = async (req, res, next) => {
  const errors = validationResult(req);
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
exports.requestForApproval = requestForApproval;
exports.getRequest = getRequest;
