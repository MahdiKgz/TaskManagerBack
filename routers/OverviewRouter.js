const express = require("express");
const overViewRouter = express.Router();
const overViewController = require("../controllers/OverviewController");

overViewRouter.route("/:userID").get(overViewController.getUserOverView);

module.exports = overViewRouter;
