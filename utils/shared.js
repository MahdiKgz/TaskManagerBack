const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  return jwt.sign(user, process.env.APP_JWT_SECRET, { expiresIn: "1d" });
};
