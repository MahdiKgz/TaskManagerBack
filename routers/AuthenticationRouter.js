const express = require("express");
const AuthRouter = express.Router();

const AuthController = require("../controllers/AuthController");
const userExists = require("../middlewares/userExistence");

AuthRouter.use(userExists);

// AuthRouter.route("/login").post(AuthController.Login);

AuthRouter.route("/register").post(AuthController.Register);

module.exports = AuthRouter;
