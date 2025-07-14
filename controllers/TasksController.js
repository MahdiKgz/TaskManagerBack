const { isValidObjectId } = require("mongoose");
const TaskModel = require("../models/TasksModel");
const TaskValidator = require("../validators/TaskValidator");

exports.createTask = async (req, res) => {
  const newTaskValidation = TaskValidator(req.body);

  const { title, description, status, user } = req.body; // Include user if needed

  if (newTaskValidation === true) {
    try {
      const newTask = await TaskModel.create({
        title,
        description,
        status,
        user, // Associate the task with a user if applicable
      });

      res.status(201).json(newTask);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Task validation failed", errors: newTaskValidation });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const listOfTasks = await TaskModel.find(
      {},
      "-__v -createdAt -updatedAt"
    ).lean();
    return res.status(200).json(listOfTasks);
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res.status(500).json({ message: "Internal Server Error!" });
  }
};

exports.getOneTask = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    try {
      const task = await TaskModel.findById(id, "-__v -createdAt -updatedAt");
      if (!task) {
        return res.status(404).json({ message: "Task not found!" });
      }
      res.status(200).json(task);
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid task ID!" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  console.log(req.user);
  if (isValidObjectId(id)) {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
      res.status(200).json({ message: "Task deleted!" });
    } catch (err) {
      console.error(err); // Log the error for debugging
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid task ID!" });
  }
};
