import { Router } from "express";
const teamRouter = Router();
// middlewares
import { checkLogin } from "../middlewares/checkLogin.js";
import { expressValidatorMapper } from "../middlewares/errorsMapper.js";
// validations => team
import { createTeamValidator } from "../validations/team.validator.js"
// controllers
import TeamController from "../controllers/team.controller.js"

teamRouter.post("/create", checkLogin, createTeamValidator(), expressValidatorMapper, TeamController.createTeam);
teamRouter.put("/update/:teamId", checkLogin, expressValidatorMapper, TeamController.updateTeam);
teamRouter.delete("/delete/:teamId", checkLogin, expressValidatorMapper, TeamController.deleteTeam);
teamRouter.get("/list-of-teams", checkLogin, expressValidatorMapper, TeamController.listOfTeams);
teamRouter.get("/get-my-teams", checkLogin, expressValidatorMapper, TeamController.getMyTeams);
teamRouter.get("/invite-user-to-team/:teamId/:username", checkLogin, expressValidatorMapper, TeamController.inviteUserToTeam);

export default teamRouter;