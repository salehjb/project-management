import { Router } from "express";
const mainRouter = Router();
// routes
import authRouter from "../routes/auth.js";
import userRouter from "../routes/user.js";
import teamRouter from "../routes/team.js";
import projectRouter from "../routes/project.js";

mainRouter.use("/auth", authRouter);
mainRouter.use("/user", userRouter);
mainRouter.use("/team", teamRouter);
mainRouter.use("/project", projectRouter);

export default mainRouter;