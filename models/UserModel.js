const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: 3,
      maxLength: 18,
      required: true,
    },
    username: {
      type: String,
      minLength: 3,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    role: {
      type: String,
      required: true,
      enum: ["USER", "ADMIN"],
    },
  },
  { timestamps: true }
);

// Virtual property to get tasks associated with the user
UserSchema.virtual("tasks", {
  ref: "tasks",
  localField: "_id",
  foreignField: "user",
});

// Ensure virtual fields are serialized
UserSchema.set("toObject", { virtuals: true });
UserSchema.set("toJSON", { virtuals: true });

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
