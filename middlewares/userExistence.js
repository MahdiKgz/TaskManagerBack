const UserModel = require("../models/UserModel");

const userExists = async (req, res, next) => {
  const { email } = req.body;
  const existingUser = await UserModel.findOne({ email });

  if (existingUser) {
    return res.status(409).json({ message: "User already Exists" });
  }

  return next();
};

module.exports = userExists;
