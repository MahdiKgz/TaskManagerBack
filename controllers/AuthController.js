const UserModel = require("../models/UserModel");
const registerValidator = require("./../validators/RegisterValidator");
const bcrypt = require("bcryptjs");

exports.Register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({ message: "Check All the fileds!" });
  }
  let { name, username, email, password } = req.body;
  // has password
  const hashedPassword = await bcrypt.hash(password, 10);

  const insertNewUser = await UserModel.create({
    name,
    username,
    email,
    password: hashedPassword,
    role: "USER",
  });

  res.status(201).json(insertNewUser);
};
