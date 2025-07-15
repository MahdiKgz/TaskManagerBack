const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(user, process.env.APP_JWT_SECRET, { expiresIn: "7d" });
};

exports.calculatePercent = (taskList, status) => {
  const task = taskList.filter((task) => task.status === status);
  const percent = (task.length / taskList.length) * 100;
  return Math.floor(percent);
};
