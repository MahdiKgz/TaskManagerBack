const express = require("express");
const morgan = require("morgan");

require("dotenv").config();
require("./config/db");

const app = express();

//Routers
const AuthRouter = require("./routers/AuthenticationRouter");

// fire middlewares
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.use("/api/auth", AuthRouter);

app.listen(process.env.APP_LISTEN_PORT, () =>
  console.log(`Server listening to ${process.env.APP_LISTEN_PORT}`)
);
