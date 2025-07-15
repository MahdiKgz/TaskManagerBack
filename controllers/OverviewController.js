const { isValidObjectId } = require("mongoose");
const TaskModel = require("../models/TasksModel");
const { calculatePercent } = require("../utils/shared");

exports.getUserOverView = async (req, res) => {
  const { userID } = req.params;
  if (isValidObjectId(userID)) {
    const tasksList = await TaskModel.find({ user: userID }).lean();

    const overViewResponse = [
      {
        type: "completed",
        value: calculatePercent(tasksList, "completed"),
      },
      {
        type: "todo",
        value: calculatePercent(tasksList, "todo"),
      },
      {
        type: "in-progress",
        value: calculatePercent(tasksList, "in-progress"),
      },
    ];
    
    res.json(overViewResponse);
  } else {
    return res.status(404).json({ message: "User Not Found !" });
  }
};
