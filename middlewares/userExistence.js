const UserModel = require("../models/UserModel");

const userExists = async (req, res, next) => {
  const { username } = req.body;
  const existingUser = await UserModel.findOne({ username });

  if (existingUser && req.url.includes("/register")) {
    return res
      .status(409)
      .json({ message: "کاربر با این مشخصات قبلا ثبت نام کرده است." });
  } else if (existingUser === null && req.url.includes("/login")) {
    return res.status(404).json({ message: "کاربری با این مشخصات پیدا نشد" });
  }
  return next();
};

module.exports = userExists;
