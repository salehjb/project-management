const UserModel = require('../models/user');

class UserController {
    async getAllUsers(req, res, next) {
        try {
            const users = await UserModel.find({}).sort({ _id: -1 });
            return res.json(users);
        } catch (error) {
            next(error);
        }
    }

    getProfile(req, res, next) {
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

    async removeUserById(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async acceptInviteInTeam(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    async rejectInviteInTeam(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();