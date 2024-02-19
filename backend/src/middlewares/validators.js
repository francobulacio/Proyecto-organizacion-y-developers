const { validationResult, check } = require("express-validator");

const validateResult = (req, res, next) => {
  try {
    validationResult(req).throw();
    return next();
  } catch (error) {
    res.status(403);
    res.send({ errors: error.array() });
  }
};

const validatorRegister = [
  check("name")
    .exists()
    .withMessage("Name field required.")
    .isLength({ min: 4 })
    .withMessage("Name must be at least 4 chars long.")
    .not()
    .isEmpty()
    .withMessage("Name cannot be empty."),
  check("password")
    .exists()
    .withMessage("Password field required.")
    .not()
    .isEmpty()
    .withMessage("Password cannot be empty.")
    .isStrongPassword({ minSymbols: 0 })
    .withMessage(
      "Weak password. Must have at least 8 chars long, and include 1 lower case, 1 upper case, 1 number"
    ),
  check("email")
    .exists()
    .withMessage("Email field required.")
    .isLength({ min: 10 })
    .withMessage("Email must be at least 10 chars long.")
    .isEmail()
    .withMessage("It should be an email."),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = validatorRegister;
