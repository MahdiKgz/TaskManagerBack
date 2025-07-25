const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minLength: 1,
      maxLength: 30,
      required: true,
    },
    description: {
      type: String,
      maxLength: 100,
      default: "",
    },
    status: {
      type: String,
      required: true,
      enum: ["todo", "in-progress", "completed"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("tasks", TaskSchema);

module.exports = TaskModel;
