const TeamModel = require("../models/team");
const UserModel = require("../models/user");
const { Types } = require("mongoose");

class TeamController {
    async getAllTeams(req, res, next) {
        try {
            const teams = await TeamModel.find({});
            return res.json(teams);
        } catch (error) {
            next(error);
        }
    }

    async getTeamById(req, res, next) {
        try {
            const teamId = req.params.id;

            // get team by id
            const team = await TeamModel.findOne({ _id: teamId });
            if (team) {
                return res.json(team);
            } else {
                throw { status: 404, message: "team not found" };
            }
        } catch (error) {
            next(error);
        }
    }

    async getMyTeams(req, res, next) {
        try {
            const userId = req.user._id;

            const teams = await TeamModel.find({
                $or: [
                    { owner: userId },
                    { users: userId }
                ]
            })
            if (teams.length > 0) {
                return res.json(teams)
            } else {
                throw { status: 400, message: "you are not a member of any team" }
            }
        } catch (error) {
            next(error);
        }
    }

    async createTeam(req, res, next) {
        try {
            const { username, name, description } = req.body;

            const owner = req.user._id;

            // create team
            const createTeam = TeamModel.create({ username, name, description, owner });
            if (createTeam) {
                return res.json({
                    status: 200,
                    message: "the team was successfully created"
                });
            } else {
                throw { status: 500, message: "team creation failed" }
            }
        } catch (error) {
            next(error);
        }
    }

    async updateTeam(req, res, next) {
        try {
            const userId = req.user._id;
            const teamId = req.params.id;

            const datas = req.body;

            // datas validation
            Object.keys(datas).forEach(([key, value]) => {
                if (!key) throw { status: 401, message: "bad request" };
                if (["", " ", ".", undefined, null, [], {}].includes(value)) throw { status: 401, message: "bad request" };
            })

            // find team by id
            const team = await TeamModel.findOne({ _id: teamId, owner: userId });
            if (!team) throw { status: 404, message: "team not found" };

            // update team
            const updateTeam = await TeamModel.updateOne({ _id: teamId }, {
                $set: datas
            })
            if (updateTeam.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: "the team profile has been updated successfully"
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
            const teamId = req.params.id;
            const userId = req.user._id;

            // get team by id
            const team = await TeamModel.findOne({ _id: teamId, owner: userId });
            if (!team) throw { status: 404, message: "team not found" };

            // delete team
            const deleteTeam = await TeamModel.deleteOne({ _id: teamId, owner: userId });
            if (deleteTeam.deletedCount > 0) {
                return res.json({
                    status: 200,
                    message: "the team was successfully deleted"
                })
            } else {
                throw { status: 500, message: "team removal failed" };
            }
        } catch (error) {
            next(error);
        }
    }

    async inviteUserToTeam(req, res, next) {
        try {
            const userId = req.user._id;
            const { username, teamId } = req.params;

            // find team by owner or users and team id
            const team = await TeamModel.findOne({ $or: [{ owner: userId }, { users: userId }], _id: teamId });
            if (!team) throw { status: 404, message: "team not found" };

            // find user by username
            const user = await UserModel.findOne({ username });
            if (!user) throw { status: 404, message: "user not found" };

            // the user already exists in the team
            const userAlreadyInvited = await TeamModel.findOne({ $or: [{ owner: user._id }, { users: user._id }], _id: teamId })
            if (userAlreadyInvited) throw { status: 400, message: "the desired user has already been invited to the team" }

            const request = {
                teamId,
                caller: req.user.username,
                request_date: new Date(),
                status: "pending",
            };

            // update invite requests in user model
            const updateUserInviteRequests = await UserModel.updateOne({ username }, { $push: { invite_requests: request } })
            if (updateUserInviteRequests.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: `your invitation has been successfully sent to ${username}`
                })
            } else {
                throw { status: 500, message: "your invitation failed" }
            }
        } catch (error) {
            next(error);
        }
    }

    async removeUserFromTeam(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new TeamController();