const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.APP_DB_URL)
  .then(() => console.log("Connected to Database"))
  .catch(() => console.log("Check if DB is down"));
