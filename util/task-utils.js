const { validationResult } = require("express-validator");
/**************************************** */
const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, assignedto, under, status } = req.body;

  const createdTask = new Task({
    title,
    description,
    assignedto,
    under,
    status,
  });

  try {
    await createdTask.save();
  } catch (err) {
    console.log(createdTask);
    const error = new HttpError(
      "Error creating Taksk, please try again later",
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ title: createdTask.title, description: createdTask.description });
};
/**************************************** */
exports.createTask = createTask;
