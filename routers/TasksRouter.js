const TaskController = require("../controllers/TasksController");

const express = require("express");
const checkUserToken = require("../middlewares/CheckUserToken");
const taskRouter = express.Router();

taskRouter.route("/").post(TaskController.createTask); // for admin user access

taskRouter
  .route("/:id")
  .delete(checkUserToken, TaskController.deleteTask) // for admin user access
  .patch(TaskController.updateTask);

taskRouter.route("/:userID/").get(TaskController.getUserTasks);

taskRouter.route("/:userID/:id").get(TaskController.getOneUserTask);
module.exports = taskRouter;
