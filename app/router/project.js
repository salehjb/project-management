const ProjectController = require('../controllers/project.controller');
const { createProjectValidator } = require('../validations/project');
const { expressValidatorMapper } = require('../middlewares/checkErrors');
const { autoLogin } = require('../middlewares/autoLogin');
const upload = require('../modules/multer');

const projectRouter = require('express').Router();

// get all projects
projectRouter.get("/", ProjectController.getAllProjects);

// create project
projectRouter.post("/create", autoLogin, upload.single("image"), createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

module.exports = projectRouter;