const jwt = require("jsonwebtoken");

const checkUserToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

module.exports = checkUserToken;
