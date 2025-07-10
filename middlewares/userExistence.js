const UserModel = require("../models/UserModel");

const userExists = async (req, res, next) => {
  const { username } = req.body;
  const existingUser = await UserModel.findOne({ username });

  if (existingUser && req.url.includes("/register")) {
    return res.status(409).json({ message: "User already Exists" });
  } else if (existingUser === null && req.url.includes("/login")) {
    return res.status(404).json({ message: "User Not found!" });
  }
  return next();
};

module.exports = userExists;
