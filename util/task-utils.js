const validator = require("../middleware/validate");
const Task = require("../models/task");
const HttpError = require("../util/http-error");
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
    tasks = await Task.find();
  } catch (err) {
    const error = new HttpError(
      "Fetching Tasks failed, please try again later." + err,
      500
    );
    return next(error);
  }
  res.json({ Tasks: tasks });
};
/**************************************** */
exports.createTask = createTask;
exports.getTasks = getTasks;
