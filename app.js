const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();
require("./config/db");

const app = express();

// fire middlewares
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(cors());

//Routers
const AuthRouter = require("./routers/AuthenticationRouter");
const TaskRouter = require("./routers/TasksRouter");

app.use("/api/auth", AuthRouter);
app.use("/api/tasks", TaskRouter);

app.listen(process.env.APP_LISTEN_PORT, () =>
  console.log(`Server listening to ${process.env.APP_LISTEN_PORT}`)
);
