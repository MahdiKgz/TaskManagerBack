const Validator = require("fastest-validator");

const v = new Validator();

const loginSchema = {
  username: {
    type: "string",
  },
  password: {
    type: "string",
  },
  $$strict: true,
};

const check = v.compile(loginSchema);

module.exports = check;
