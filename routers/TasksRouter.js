const TaskController = require("../controllers/TasksController");

const express = require("express");
const taskRouter = express.Router();

taskRouter
  .route("/")
  .get(TaskController.getAllTasks)
  .post(TaskController.createTask);

taskRouter
  .route("/:id")
  .get(TaskController.getOneTask)
  .delete(TaskController.deleteTask);

module.exports = taskRouter;
