const { verifyToken } = require("../../../task-manager/module/utils");
const UserModel = require("../models/user");

async function autoLogin(req, res, next) {
    try {
        req.user = undefined;
        req.isLoggedIn = false;

        const headers = req.headers;

        // get token from request headers
        const token = headers.authorization.split(" ")[1];
        if (!token) throw { status: 401, message: "please login in to your account" };

        // get result from verify user token
        const result = verifyToken(token);

        // find user by username
        const user = await UserModel.findOne({ username: result.username });
        if (!user) throw { status: 401, message: "please login to your account" };

        req.user = user;
        req.isLoggedIn = true;

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    autoLogin
}