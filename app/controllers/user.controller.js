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

    createUser(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    updateUserById(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    removeUserById(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    acceptInviteInTeam(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }

    rejectInviteInTeam(req, res, next) {
        try {

        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController();