const express = require("express");

const AuthRouter = express.Router();

AuthRouter.route("/login").post(AuthController.Login);

AuthRouter.route("/register").post(AuthController.Register);

module.exports = AuthRouter;
