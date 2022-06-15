import { body } from "express-validator";
import bcrypt from "bcrypt"
// models
import UserModel from "../models/user.model.js"

function registerValidator() {
  return [
    body("username").notEmpty().withMessage("username can not be empty").custom(async (username, ctx) => {
      const userExistWithUsername = await UserModel.findOne({ username });
      if (userExistWithUsername) throw "username already in use";
      return true;
    }),
    body("email").notEmpty().isEmail().withMessage("please enter a valid email").custom(async (email, ctx) => {
      const userExistWithEmail = await UserModel.findOne({ email })
      if (userExistWithEmail) throw "email already in use";
      return true;
    }),
    body("mobile").notEmpty().isMobilePhone("fa-IR").withMessage("please enter a valid mobile phone").custom(async (mobile, ctx) => {
      const userExistWithUsername = await UserModel.findOne({ mobile })
      if (userExistWithUsername) throw "mobile phone already in use";
      return true;
    }),
    body("password").isLength({ min: 5 }).withMessage("password can not be less than 5 characters").custom(async (password, ctx) => {
      if (!password) throw "password can not be empty";
      if (password !== ctx.req.body.confirm_password) throw "password not equal to confirm password"
    })
  ]
}

function loginValidator() {
  return [
    body("username").notEmpty().withMessage("username can not be empty"),
    body("password").notEmpty().withMessage("password can not be empty")
  ]
}

export { registerValidator, loginValidator };