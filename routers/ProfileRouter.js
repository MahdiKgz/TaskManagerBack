const express = require("express");
const checkUserToken = require("../middlewares/CheckUserToken");
const ProfileRouter = express.Router();
const ProfileController = require("../controllers/ProfileController");

ProfileRouter.use(checkUserToken);

ProfileRouter.route("/edit-password/:id").put(ProfileController.editPassword);
ProfileRouter.route("/edit-info/:id").put(ProfileController.editInfo);

module.exports = ProfileRouter;
