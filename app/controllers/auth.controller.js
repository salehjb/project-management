const { validationResult } = require("express-validator");
const UserModel = require("../models/user");
const { hashString } = require("../modules/utils");

class AuthController {
    async register(req, res, next) {
        try {
            const { username, password, email, mobile } = req.body;

            // hash password
            const hashPassword = hashString(password);

            // register user
            const registerUser = await UserModel.create({ username, email, mobile, password: hashPassword });
            if (registerUser) {
                return res.json({ status: 201, message: "registration was successful" })
            } else {
                throw { status: 500, message: "registration failed" }
            }
        } catch (error) {
            next(error);
        }
    };

    async login(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    };

    async resetPassword(req, res, next) {
        try {
            
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new AuthController();