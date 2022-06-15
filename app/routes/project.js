import { Router } from "express";
const projectRouter = Router();
// middlewares
import { expressValidatorMapper } from "../middlewares/errorsMapper.js";
import { checkLogin } from "../middlewares/checkLogin.js";
// controllers
import ProjectController from "../controllers/project.controller.js";
// validations
import { createProjectValidator } from "../validations/project.validation.js";

projectRouter.post("/create/:teamId", checkLogin, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);
projectRouter.put("/update/:projectId", checkLogin, expressValidatorMapper, ProjectController.updateProject)
projectRouter.delete("/delete/:projectId", checkLogin, ProjectController.deleteProject);
projectRouter.get("/get-all-projects", ProjectController.getAllProjects)
projectRouter.get("/get-project-by-id/:projectId", ProjectController.getProjectById)

export default projectRouter;