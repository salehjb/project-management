const ProjectController = require("../controllers/project.controller");
const { createProjectValidator } = require("../validations/project");
const { expressValidatorMapper } = require("../middlewares/checkErrors");
const fileUpload = require("express-fileupload");
const uploadFile = require("../modules/fileUpload");
const { checkMongoId } = require("../middlewares/checkMongoId");

const projectRouter = require("express").Router();

// get all projects
projectRouter.get("/", ProjectController.getAllProjects);

// get project by id
projectRouter.get("/:id", checkMongoId, ProjectController.getProjectById);

// create project
projectRouter.post("/create", fileUpload(), uploadFile, createProjectValidator(), expressValidatorMapper, ProjectController.createProject);

// update project
projectRouter.put("/:id", checkMongoId, ProjectController.updateProject);

// update project image
projectRouter.put("/update-project-image/:id", fileUpload(), uploadFile, ProjectController.updateProjectImage)

// delete project
projectRouter.delete("/:id", checkMongoId, ProjectController.deleteProject);


module.exports = projectRouter;