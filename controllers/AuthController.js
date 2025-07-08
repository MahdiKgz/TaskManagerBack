const UserModel = require("../models/UserModel");
const registerValidator = require("./../validators/RegisterValidator");

exports.Register = async (req, res) => {
  const validationResult = registerValidator(req.body);

  if (validationResult !== true) {
    return res.status(422).json({ message: "Check All the fileds!" });
  }
  let { name, username, email, password } = req.body;

  //check user existence
  const checkUserExists = await UserModel.findOne({ email });
  if (checkUserExists?.email) {
    return res.status(409).json({ message: "User already exists!" });
  }

  const insertNewUser = await UserModel.create({
    name,
    username,
    email,
    password,
    role: "USER",
  });

  res.status(201).json(insertNewUser);
};
