// models
import TeamModel from "../models/team.model.js";
import UserModel from "../models/user.model.js";

class TeamController {
  async createTeam(req, res, next) {
    try {
      const data = req.body;
      const { name, description, username } = req.body;
      const ownerId = req.user._id;
      // validation of inputs
      Object.entries(data).forEach(([key, value]) => {
        if (!["name", "description", "username"].includes(key)) throw { status: 400, message: "please enter a valid key" }
        if (!value) throw { status: 400, message: "please enter a valid value" }
      })
      // create team
      const createTeam = await TeamModel.create({ ...data, owner: ownerId });
      // created or not
      if (createTeam) {
        res.status(200).json({
           status: 200,
           success: true,
           message: "team creation successfully" 
        })
      } else {
        throw { status: 500, message: "team creation failure" }
      }
    } catch (error) {
      next(error);
    }
  }

  async updateTeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user._id;
      const data = req.body;
      // validation of inputs
      Object.entries(data).forEach(([key, value]) => {
        if (!["name", "description", "username"].includes(key)) throw { status: 400, message: "please enter a valid key" }
        if (!value) throw { status: 400, message: "please enter a valid value" }
      });
      // team exist or not
      const team = await TeamModel.findOne({ owner: userId, _id: teamId });
      if (!team) throw { status: 404, message: "no team with the ID you were looking for was found or you are not owner of the team" } 
      // update team
      const updateTeam = await TeamModel.updateOne({ _id: teamId }, { $set: data })
      // updated or not
      if (updateTeam.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,  
          message: "team update completed successfully"
        })
      } else {
        throw { status: 500, message: "team update failed" }
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteTeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const userId = req.user._id;
      // team exist or not
      const team = await TeamModel.findOne({ owner: userId, _id: teamId });
      if (!team) throw { status: 404, message: "no team with the ID you were looking for was found or you are not owner of the team" }
      // deleted team
      const deletedTeam = await TeamModel.deleteOne({ _id: teamId });
      // deleted or not
      if (deletedTeam.deletedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "team delete completed successfully"  
        })
      } else {
        throw { status: 500, message: "team delete failed" }
      }
    } catch (error) {
      next(error);
    }
  }

  async listOfTeams(req, res, next) {
    try {
      const teams = await TeamModel.find({})
      res.status(200).json(teams) 
    } catch (error) {
      next(error);
    }
  }

  async getMyTeams(req, res, next) {
    try {
      const userId = req.user._id;
      // get my teams
      const teams = await TeamModel.aggregate([
        { $match: { $or: [{ owner: userId }, { users: userId }] } },
        {
          $lookup: {
            from: "users",
            localField: "owner",
            foreignField: "_id",
            as: "owner",
          }  
        },
        { $project: { "owner.role": 0, "owner.mobile": 0, "owner.password": 0, "owner.token": 0, "owner.updatedAt": 0, "owner.__v": 0 } },
        { $unwind: "$owner" },
      ]);
      // find team or not
      if (teams[0].name) {
        res.status(200).json(teams);
      } else {
        throw { status: 500, message: "you are not a member of any team" };
      }
    } catch (error) {
      next(error);
    }
  }

  async inviteUserToTeam(req, res, next) {
    try {
      const userId = req.user._id;
      const { teamId, username } = req.params;
      // find team
      const team = await TeamModel.findOne({
        $or: [{ owner: userId }, { users: userId }],
        _id: teamId,
      });
      if (!team) throw { status: 400, message: "either no team was found or you are not a member of this team" };
      // find user
      const user = await UserModel.findOne({ username });
      if (!user) throw { status: 404, message: "the user you are looking for could not be found" }
      // create request
      const request = {
        caller: req.user.username,
        requestDate: new Date(),
        teamId,
        status: "pending"
      }
      // get prev invite requests
      const prevInviteRequests = user.invite_requests;
      // send invite request
      const sendInviteRequest = await UserModel.updateOne({ username }, { invite_requests: [ ...prevInviteRequests, request ] })
      // sended or not
      if (sendInviteRequest.modifiedCount > 0) {
        res.status(200).json({
          status: 200,
          success: true,
          message: "invite send successfully",
        })
      } else {
        throw { status: 500, message: "invite send failed" }
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new TeamController();
