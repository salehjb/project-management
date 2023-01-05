const ProjectController = require('../controllers/project.controller');
const { createProjectValidator } = require('../validations/project');
const { expressValidatorMapper } = require('../middlewares/checkErrors');
const { autoLogin } = require('../middlewares/autoLogin');

const projectRouter = require('express').Router();

// get all projects
projectRouter.get("/", ProjectController.getAllProjects);

// create project
projectRouter.post("/create", autoLogin, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

module.exports = projectRouter;