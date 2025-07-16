const UserModel = require("../models/UserModel");
const { generateToken } = require("../utils/shared");
const registerValidator = require("./../validators/RegisterValidator");
const LoginValidator = require("../validators/LoginValidtor");
const bcrypt = require("bcryptjs");

exports.Register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({ message: "همه مقادیر را با دقت پر کنید !" });
  }
  let { name, username, email, password } = req.body;
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertNewUser = await UserModel.create({
    name,
    username,
    email,
    password: hashedPassword,
    role: "USER",
  });
  const token = generateToken(insertNewUser.toObject());

  res.status(201).json({ ...insertNewUser.toObject(), token });
};

exports.Login = async (req, res) => {
  const LoginValidation = LoginValidator(req.body);
  if (LoginValidation !== true) {
    return res.status(429).json({ message: "همه مقادیر را با دقت پر کنید !" });
  }

  const { username, password } = req.body;

  const user = await UserModel.findOne(
    { username },
    "-__v -createdAt -updatedAt "
  );

  if (!user) {
    return res.status(404).json({ message: "User Not found!" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res
      .status(403)
      .json({ messge: "نام کاربری یا رمز عبور اشتباه است ! " });
  }
  const token = generateToken(user.toObject());
  return res.status(200).json({ ...user.toObject(), token });
};
