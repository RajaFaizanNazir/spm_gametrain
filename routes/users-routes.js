const express = require("express");
/**************************************** */
const usersController = require("../controllers/users-controllers");
const taskUtils = require("../controllers/task-controllers");
const requestUtils = require("../controllers/request-controllers");
const validator = require("../middleware/validate");
/**************************************** */
const router = express.Router();
/**************************************** */
router.get("/viewTasks", taskUtils.getTasks);
/**************************************** */
router.get("/viewRequests", requestUtils.getRequest);
/**************************************** */
router.post(
  "/signup",
  validator.credentialsValidator(),
  usersController.signup
);
/**************************************** */
router.post("/login", validator.credentialsValidator(), usersController.login);
/**************************************** */
router.post(
  "/updatePosition",
  validator.positionValidator(),
  usersController.updatePosition
);
/**************************************** */
router.post(
  "/updatePassword",
  validator.credentialsValidator(),
  usersController.updatePassword
);
/**************************************** */
router.post("/updateTaskTitle", validator.idValidator(), taskUtils.updateTitle);
/**************************************** */
router.post(
  "/updateTaskDescription",
  validator.idValidator(),
  taskUtils.updateDescription
);
/**************************************** */
router.post("/createTask", validator.taskValidator(), taskUtils.createTask);
/**************************************** */
router.post(
  "/requestForApproval",
  validator.requestValidator(),
  requestUtils.requestForApproval
);
/**************************************** */
router.post(
  "/viewTasksUnder",
  validator.emailValidator(),
  taskUtils.getTasksUnder
);
/**************************************** */
router.post(
  "/viewTasksAssignedTo",
  validator.emailValidator(),
  taskUtils.getTasksAssignedTo
);
/**************************************** */
router.post(
  "/viewRequestsFrom",
  validator.emailValidator(),
  requestUtils.getRequestsFrom
);
/**************************************** */
router.post(
  "/viewRequestsFor",
  validator.emailValidator(),
  requestUtils.getRequestsFor
);
/**************************************** */
router.post(
  "/acceptRequest",
  validator.idValidator(),
  requestUtils.acceptRequest
);
/**************************************** */
router.post(
  "/rejectRequest",
  validator.idValidator(),
  requestUtils.rejectRequest
);
/**************************************** */
router.post(
  "/assignTask",
  validator.taskstateValidator(),
  taskUtils.assignTask
);
/**************************************** */
router.post("/setPM", validator.taskstateValidator(), taskUtils.setPM);
/**************************************** */
module.exports = router;
/**************************************** */
