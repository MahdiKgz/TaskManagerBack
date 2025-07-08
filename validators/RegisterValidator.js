const Validator = require("fastest-validator");

const v = new Validator();

const registerSchema = {
  name: {
    type: "string",
    min: 3,
    max: 18,
  },
  username: {
    type: "string",
  },
  email: {
    type: "string",
  },
  password: {
    type: "string",
    min: 8,
  },
  confirmPassword: {
    type: "equal",
    field: "password",
  },
};

const check = v.compile(registerSchema);

module.exports = check;
