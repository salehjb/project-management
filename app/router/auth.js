const AuthController = require("../controllers/auth.controller");
const { registerValidator, loginValidator } = require("../validations/auth");
const { expressValidatorMapper } = require("../middlewares/checkErrors");

const authRouter = require("express").Router();

// user registration
authRouter.post("/register", registerValidator(), expressValidatorMapper, AuthController.register);

// user login
authRouter.post("/login", loginValidator(), expressValidatorMapper, AuthController.login);

module.exports = authRouter;