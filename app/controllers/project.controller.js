// models
import ProjectModel from "../models/project.model.js";
import TeamModel from "../models/team.model.js"

class ProjectController {
  async createProject(req, res, next) {
    try {
      const data = req.body;
      const owner = req.user._id;
      const { teamId } = req.params;
      // team exist with id
      const team = await TeamModel.findOne({ _id: teamId });
      if (!team) throw { status: 404, message: "the team you are looking for could not be found"}
      // validation of inputs
      Object.entries(data).forEach(([key, value]) => {
        if (!["title", "text", "tags"].includes(key)) throw { status: 400, message: "please enter a valid key" };
        if (!value) throw { status: 400, message: "please enter a valid value" };
      })
      // create project
      const createProject = await ProjectModel.create({ ...data, owner, team: teamId });
      // create project or not
      if (createProject) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "your project was created successfully", 
        })
      } else {
        throw { status: 500, message: "your project failed" }
      }
    } catch (error) {
      next(error);
    }
  }

  async updateProject(req, res, next) {
    try {
      const data = req.body;
      const { projectId } = req.params;
      // project exist with project id
      const project = await ProjectModel.findOne({ _id: projectId });
      if (!project) throw { status: 404, message: "the project you are looking for could not be found" };
      // validation of inputs
      Object.entries(data).forEach(([key, value]) => {
        if (!["title", "text", "tags"].includes(key)) throw { status: 400, message: "please enter a valid key" };
        if (!value) throw { status: 400, message: "please enter a valid value" };
      });
      // update project
      const updateProject = await ProjectModel.updateOne({ _id: projectId }, { $set: data })
      // update project or not
      if (updateProject.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "project update completed successfully"
        })
      } else {
        throw { status: 500, message: "project update failed" }
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteProject(req, res, next) {
    try {
      const userId = req.user._id;
      const { projectId } = req.params;
      // get project
      const project = await ProjectModel.findOne({ owner: userId, _id: projectId });
      if (!project) throw { status: 404, message: "the project you are looking for could not be found or you are not the creator of this project" };
      // delete project
      const deleteProject = await ProjectModel.deleteOne({ _id: projectId });
      // deleted or not
      if (deleteProject.deletedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "project successfully deleted"
        });
      } else {
        throw { status: 500, message: "project deletion failed" };
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllProjects(req, res, next) {
    try {
      const projects = await ProjectModel.find({});
      res.status(200).json(projects);
    } catch (error) {
      next(error);
    }
  }

  async getProjectById(req, res, next) {
    try {
      const { projectId } = req.params;
      // get project by id
      const project = await ProjectModel.findOne({ _id: projectId });
      // project exist or not
      if (!project) throw { status: 404, message: "the project you are looking for could not be found" }
      // project found
      res.status(200).json(project);
    } catch (error) {
      next(error);
    }
  }
}

export default new ProjectController;