const ProjectModel = require("../models/project");

class ProjectController {
    async getAllProjects(req, res, next) {
        try {
            const owner = req.user._id;
            const projects = await ProjectModel.find({ owner });
            res.json(projects);
        } catch (error) {
            next(error);
        }
    }

    async getProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;

            // find project by id
            const project = await ProjectModel.findOne({ _id: projectId, owner });
            if (!project) throw { status: 404, message: "project not found" };

            return res.json(project);
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
            let image = req.body.image;

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
            const owner = req.user._id;
            const projectId = req.params.id;

            // find project by id
            const project = await ProjectModel.findOne({ _id: projectId, owner });
            if (!project) throw { status: 404, message: "project not found" };

            const datas = req.body;

            console.log(datas);

            // datas validator
            Object.entries(datas).forEach(([key, value]) => {
                if (!["title", "description", "tags"].includes(key)) throw { status: 401, message: "bad request" };
                if (key === "tags") {
                    if (Array.isArray(datas["tags"])) {
                        datas["tags"] = datas["tags"].filter((item) => {
                            if (!["", " ", ".", undefined, null, [], {}].includes(value)) throw { status: 401, message: "bad request" };
                        })
                    } else {
                        throw { status: 401, message: "tags should be array" }
                    }
                }
                if (["", " ", ".", undefined, null, [], {}].includes(value)) throw { status: 401, message: "bad request" };
            })

            // update project
            const updateProject = await ProjectModel.updateOne({ _id: projectId, owner }, { $set: datas });
            if (updateProject.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: "your project has been updated successfully"
                })
            } else {
                throw { status: 500, message: "your project update failed" }
            }
        } catch (error) {
            next(error);
        }
    }

    async updateProjectImage(req, res, next) {
        try {
            const image = req.body.image;
            const owner = req.user._id;
            const projectId = req.params.id;

            // find project by id
            const project = await ProjectModel.findOne({ _id: projectId, owner });
            if (!project) throw { status: 404, message: "project not found" };

            const updateProjectImage = await ProjectModel.updateOne({ _id: projectId, owner }, { $set: { image } })
            if (updateProjectImage.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: "the project photo has been updated successfully"
                })
            } else {
                throw { status: 500, message: "project photo update failed" }
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectId = req.params.id;

            // find project by id
            const project = await ProjectModel.findOne({ _id: projectId, owner });
            if (!project) throw { status: 404, message: "project not found" };

            // delete project
            const deleteProject = await ProjectModel.deleteOne({ _id: projectId, owner });
            if (deleteProject.deletedCount > 0) {
                return res.json({
                    status: 200,
                    message: "the project was deleted successfully"
                })
            } else {
                throw { status: 500, message: "failed to delete project" }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new ProjectController()