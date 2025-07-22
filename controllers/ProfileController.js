const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

exports.editPassword = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "شناسه کاربر نامعتبر است!" });
  }

  // Use findById to get a single user
  const user = await UserModel.findById(id);
  if (!user) {
    return res.status(404).json({ message: "کاربری با این شناسه پیدا نشد!" });
  }

  const { currentPassword, newPassword, confirmNewPassword } = req.body;

  // Compare the current password with the stored password
  const passwordMatch = await bcrypt.compare(currentPassword, user.password);
  if (!passwordMatch) {
    return res
      .status(404)
      .json({ message: "رمز عبور یا تکرار آن اشتباه است." });
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmNewPassword) {
    return res
      .status(405)
      .json({ message: "رمز عبور جدید با تکرار آن یکسان نیست!" });
  }

  // Hash the new password
  const newHashedPassword = await bcrypt.hash(newPassword, 10);

  // Update the user's password with the new hashed password
  await UserModel.findByIdAndUpdate(id, {
    $set: {
      password: newHashedPassword,
    },
  });

  res.json({ message: "رمز عبور با موفقیت تغییر کرد!" });
};
