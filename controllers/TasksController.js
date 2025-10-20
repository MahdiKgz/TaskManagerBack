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
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    return res
      .status(400)
      .json({ message: "Task validation failed", errors: newTaskValidation });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    try {
      const deletedTask = await TaskModel.findByIdAndDelete(id);
      if (!deletedTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
      res.status(200).json({ message: "Task deleted!" });
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error!" });
    }
  } else {
    return res.status(400).json({ message: "Invalid task ID!" });
  }
};

exports.getUserTasks = async (req, res) => {
  const { userID } = req.params;
  try {
    if (isValidObjectId(userID)) {
      const tasksByUserID = await TaskModel.find({ user: userID });
      return res.status(200).json(tasksByUserID);
    } else {
      return res
        .status(403)
        .json({ message: "invalid user ID. access denied" });
    }
  } catch (err) {
    return res.json({ message: "Internal server error !" });
  }
};

exports.getOneUserTask = async (req, res) => {
  const { userID, id } = req.params;
  try {
    if (isValidObjectId(userID) && isValidObjectId(id)) {
      const singleTaskById = await TaskModel.findOne({ user: userID, _id: id });
      return res.status(200).json(singleTaskById);
    } else {
      return res.status(404).json({ message: "invalid userID or task ID" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  try {
    if (isValidObjectId(id)) {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { title, description, status },
        { new: true },
      );
      if (!updatedTask) {
        return res.status(404).json({ message: "Task not found!" });
      }
      return res.status(200).json({ message: "Task updated!" });
    } else {
      return res.status(400).json({ message: "Invalid task ID!" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
