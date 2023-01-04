const { body } = require('express-validator');
const UserModel = require('../models/user');

function registerValidator() {
    return [
        body("username").isLength({ min: 4, max: 25 }).withMessage("username cannot be less than 4 and more than 25 characters").custom(async (username, ctx) => {
            const user = await UserModel.findOne({ username });
            if (user) throw "username already exists";
            return true;
        }),
        body("email").isEmail().withMessage("email is not valid").custom(async (email, ctx) => {
            const user = await UserModel.findOne({ email });
            if (user) throw "email already exists";
            return true;
        }),
        body("mobile").isMobilePhone("fa-IR").withMessage("mobile phone is not valid").custom(async (mobile, ctx) => {
            const user = await UserModel.findOne({ mobile });
            if (user) throw "mobile already exists";
            return true;
        }),
        body("password").isLength({ min: 6, max: 16 }).withMessage("password cannot be less than 6 and more than 16 characters").custom((value, ctx) => {
            if (value !== ctx.req.body.confirm_password) throw "password not equal to confirm password";
            return true;
        })
    ]
}

module.exports = {
    registerValidator,
}