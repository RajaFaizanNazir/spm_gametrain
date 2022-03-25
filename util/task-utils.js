const validator = require("../middleware/validate");
const Task = require("../models/task");
const HttpError = require("../util/http-error");
const User = require("../models/user");
/**************************************** */
const createTask = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, assignedTo, under, status } = req.body;

  const createdTask = new Task({
    title,
    description,
    assignedTo,
    under,
    status,
  });

  try {
    await createdTask.save();
  } catch (err) {
    console.log(createdTask);
    const error = new HttpError(
      "Error creating Task, please try again later" + err,
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ title: createdTask.title, description: createdTask.description });
};
/**************************************** */
const getTasks = async (req, res, next) => {
  let tasks;
  try {
    tasks = await Task.find().populate("assignedTo").populate("under");
  } catch (err) {
    const error = new HttpError(
      "Fetching Tasks failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({
    Tasks: tasks,
  });
};
/**************************************** */
const getTasksUnder = async (req, res, next) => {
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
  let existingTask;
  try {
    existingTask = await Task.find({ under: existingUser.id })
      .populate("assignedTo")
      .populate("under");
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingTask) {
    const error = new HttpError("No Task found.", 403);
    return next(error);
  }
  res.json({
    Task: existingTask,
  });
};
/**************************************** */
const getTasksAssignedTo = async (req, res, next) => {
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
  let existingTask;
  try {
    existingTask = await Task.find({ assignedTo: existingUser.id })
      .populate("assignedTo")
      .populate("under");
  } catch (err) {
    const error = new HttpError("Please try again later." + err, 500);
    return next(error);
  }
  if (!existingTask) {
    const error = new HttpError("No Task found.", 403);
    return next(error);
  }
  res.json({
    Task: existingTask,
  });
};
/**************************************** */
const updateTitle = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { id, title } = req.body;
  let existingTask;
  try {
    existingTask = await Task.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    existingTask = await Task.findOneAndUpdate(
      { id: id },
      { title: title },
      {
        new: true,
      }
    );
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res.status(201).json({ Task: existingTask });
};
/**************************************** */
const updateDescription = async (req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { id, description } = req.body;
  let existingTask;
  try {
    existingTask = await Task.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Can not find user with this email, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    existingTask = await Task.findOneAndUpdate(
      { id: id },
      { description: description },
      {
        new: true,
      }
    );
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res.status(201).json({ Task: existingTask });
};
/**************************************** */
const completeTask = async (id, req, res, next) => {
  const errors = validator.validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  let existingTask;
  try {
    existingTask = await Task.findById(id);
  } catch (err) {
    const error = new HttpError(
      "Can not find Task, please try again." + err,
      500
    );
    return next(error);
  }
  try {
    existingTask = await Task.findOneAndUpdate(
      { id: id },
      { status: "COMPLETE" },
      {
        new: true,
      }
    );
  } catch (err) {
    const error = new HttpError("Error updading document = " + err, 500);
    return next(error);
  }
  res.status(201).json({ Task: existingTask });
};
/**************************************** */
module.exports = {
  createTask,
  getTasks,
  getTasksUnder,
  getTasksAssignedTo,
  updateTitle,
  updateDescription,
  completeTask,
};
/**************************************** */
