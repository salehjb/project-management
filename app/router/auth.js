const AuthController = require('../controllers/auth.controller');
const { registerValidator } = require('../validations/auth');
const { expressValidatorMapper } = require('../middlewares/checkErrors');

const authRouter = require('express').Router();

authRouter.post("/register", registerValidator(), expressValidatorMapper, AuthController.register)

module.exports = authRouter;