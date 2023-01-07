const UserModel = require("../models/user");

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.find({}).sort({ _id: -1 });
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    async getProfile(req, res, next) {
        try {
            const user = req.user;

            return res.json(user);
        } catch (error) {
            next(error);
        }
    }

    async updateUser(req, res, next) {
        try {
            // get user id
            const userId = req.user._id;

            const datas = req.body;

            // datas validator
            Object.entries(datas).forEach(([value, key]) => {
                if (!["first_name", "last_name", "skills"].includes(key)) throw { status: 401, message: "bad request" };
                if (["", " ", ".", undefined, null, [], {}].includes(value)) throw { status: 401, message: "bad request" };
            })

            // update user
            const updateUser = await UserModel.updateOne({ _id: userId }, { $set: datas });
            if (updateUser.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: "user updated successfully"
                });
            } else {
                throw { status: 500, message: "user updated failed" };
            }
        } catch (error) {
            next(error);
        }
    }

    async uploadProfileImage(req, res, next) {
        try {
            // get user id
            const userId = req.user._id;

            // create image path for save in database
            const image = `${req.protocol}://${req.get("host")}/${req.file.path.substring(7).replace(/\\/g, "/")}`;

            // upload profile image
            const uploadProfileImage = await UserModel.updateOne({ _id: userId }, { $set: { profile_image: image } });
            if (uploadProfileImage.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: "your profile picture has been successfully uploaded"
                });
            } else {
                throw { status: 500, message: "failed to upload your profile picture" };
            }
        } catch (error) {
            next(error);
        }
    }

    async removeUserById(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async getAllRequests(req, res, next) {
        try {
            const userId = req.user._id;

            // get requests by user id
            const requests = await UserModel.findOne({ _id: userId }, { invite_requests: 1, _id: 0 });
            return res.json(requests)
        } catch (error) {
            next(error);
        }
    }

    async getRequestsByStatus(req, res, next) {
        try {
            const userId = req.user._id;
            const { status } = req.params;

            const requests = await UserModel.aggregate([
                { $match: { _id: userId } },
                {
                    $project: {
                        invite_requests: 1,
                        _id: 0,
                        invite_requests: {
                            $filter: {
                                input: "$invite_requests",
                                as: "request",
                                cond: {
                                    $eq: ["$$request.status", status]
                                }
                            }
                        }
                    }
                },
            ])
            if (requests.length > 0) {
                return res.json(requests);
            } else {
                throw { status: 500, message: "you have no requests" }
            }
        } catch (error) {
            next(error);
        }
    }

    async changeRequestStatus(req, res, next) {
        try {
            const { id, status } = req.params;

            // find user by request id
            const user = await UserModel.findOne({ "invite_requests._id": id });
            if (!user) throw { status: 404, message: "invite request not found" };

            // get the requested invitation
            const findRequest = user.invite_requests.find((item) => item._id == id);
            if (findRequest.status !== "pending") throw { status: 400, message: "you have already responded to this invitation" };

            if (!["accepted", "rejected"].includes(status)) throw { status: 401, message: "please enter a valid status" };

            // update reauest status
            const updateRequestStatus = await UserModel.updateOne({ "invite_requests._id": id }, {
                $set: {
                    "invite_requests.$.status": status,
                }
            })
            if (updateRequestStatus.modifiedCount > 0) {
                return res.json({
                    status: 200,
                    message: `you have ${status} the team invitation request`
                })
            } else {
                throw { status: 500, message: `you have ${status} the team invitation request` }
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();