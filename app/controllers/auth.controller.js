const UserModel = require("../models/user");
const { hashString, compareStringWithHash, tokenGenerator } = require("../modules/utils");

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
            const { username, password } = req.body;

            // find user by username
            const user = await UserModel.findOne({ username });
            if (!user) throw { status: 401, message: "username or password is not correct" };

            // compare the entered password with the user's password
            if (!compareStringWithHash(password, user.password)) throw { status: 401, message: "username or password is not correct" };

            // generate token
            const token = tokenGenerator({ username });
            user.token = token;
            user.save();

            return res.json({
                status: 200,
                message: "you have successfully logged into your account",
            })
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