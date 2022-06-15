import { Router } from "express";
const authRouter = Router();
// middlewares
import { expressValidatorMapper } from "../middlewares/errorsMapper.js";
// validations
import { registerValidator, loginValidator } from "../validations/auth.validator.js"
// controllers
import AuthController from "../controllers/auth.controller.js"

authRouter.post("/register", registerValidator(), expressValidatorMapper, AuthController.register);
authRouter.post("/login", loginValidator(), expressValidatorMapper, AuthController.login);

export default authRouter;
