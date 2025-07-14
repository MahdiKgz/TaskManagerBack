const Validator = require("fastest-validator");

const v = new Validator();

const taskSchema = {
  title: {
    type: "string",
    min: 1,
    max: 30,
  },
  description: {
    type: "string",
    max: 100,
  },
  status: {
    type: "string",
  },
};

const check = v.compile(taskSchema);

module.exports = check;
