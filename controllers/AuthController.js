const UserModel = require("../models/UserModel");
const { generateToken } = require("../utils/shared");
const registerValidator = require("./../validators/RegisterValidator");
const bcrypt = require("bcryptjs");

exports.Register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({ message: "Check All the fileds!" });
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

  res.status(201).json({ token });
};
