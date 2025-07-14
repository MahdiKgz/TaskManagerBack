const { isValidObjectId } = require("mongoose");
const TaskModel = require("../models/TasksModel");
const TaskValidator = require("../validators/TaskValidator");

exports.createTask = async (req, res) => {
  const newTaksValidation = TaskValidator(req.body);

  const { title, description, status } = req.body;

  if (newTaksValidation === true) {
    try {
      const newTask = await TaskModel.create({
        title,
        description,
        status,
      });

      res.status(201).json(newTask);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error !!" });
    }
  } else {
    return res
      .status(429)
      .json({ message: "Something wrong in Task Validation" });
  }
};

exports.getAllTasks = async (req, res) => {
  const listOfTasks = await TaskModel.find(
    {},
    "-__v -createdAt -updatedAt"
  ).lean();
  return res.status(200).json(listOfTasks);
};

exports.getOneTask = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    try {
      const task = await TaskModel.findOne(
        { _id: id },
        "-__v -createdAt -updatedAt"
      );
      res.json(task);
    } catch (err) {
      res.status(500).json({ messge: "Internal Server Error !" });
    }
  } else {
    return res.status(404).json({ message: "Task Not found!" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  if (isValidObjectId(id)) {
    try {
      await TaskModel.findOneAndDelete({ _id: id });
      res.json({ message: "Task Deleted !" });
    } catch (err) {
      res.status(500).json({ messge: "Internal Server Error !" });
    }
  } else {
    return res.status(404).json({ message: "Task Not found!" });
  }
};
