const TeamController = require("../controllers/team.controller");
const { checkMongoId } = require("../middlewares/checkMongoId");
const { createTeamValidator } = require("../validations/team");
const { expressValidatorMapper } = require("../middlewares/checkErrors");

const teamRouter = require("express").Router();

// get all teams
teamRouter.get("/", TeamController.getAllTeams);

// get my teams
teamRouter.get("/my-teams", TeamController.getMyTeams);

// invite user to team
teamRouter.get("/invite/:teamId/:username", TeamController.inviteUserToTeam);

// get team by id
teamRouter.get("/:id", checkMongoId, TeamController.getTeamById);

// create team
teamRouter.post("/create", createTeamValidator(), expressValidatorMapper, TeamController.createTeam);

// update team
teamRouter.put("/:id", TeamController.updateTeam);

// delete team
teamRouter.delete("/:id", TeamController.deleteTeam);

module.exports = teamRouter;