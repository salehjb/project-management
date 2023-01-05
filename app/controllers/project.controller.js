const ProjectModel = require('../models/project');
const UserModel = require('../models/user');

class ProjectController {
    async getAllProjects(req, res, next) {
        try {
            const projects = await ProjectModel.find({}).sort({ _id: -1 });
            res.json(projects);
        } catch (error) {
            next(error);
        }
    }

    async getProjectByTeam(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async getProjectByUser(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async createProject(req, res, next) {
        try {
            const { title, description, tags } = req.body;

            // create image path for save in database
            let image;
            if (req.file) {
                image = `${req.protocol}://${req.get("host")}/${req.file.path.substring(7).replace(/\\/g, "/")}`;
            }

            // get user id
            const userId = req.user._id;

            // create project
            const createProject = await ProjectModel.create({ title, description, owner: userId, image, tags });
            if (createProject) {
                return res.json({
                    status: 201,
                    message: "the project was created successfully"
                })
            } else {
                throw { status: 500, message: "the project could not be created" };
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProject(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async removeProject(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProjectController()