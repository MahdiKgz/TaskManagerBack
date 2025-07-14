const TaskController = require("../controllers/TasksController");

const express = require("express");
const checkUserToken = require("../middlewares/DeleteTaskByUser");
const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(TaskController.getAllTasks)
  .post(TaskController.createTask);

taskRouter
  .route("/:id")
  .get(TaskController.getOneTask)
  .delete(checkUserToken, TaskController.deleteTask);

module.exports = taskRouter;
