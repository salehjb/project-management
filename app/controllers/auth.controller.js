import bcrypt from "bcrypt";
// models
import UserModel from "../models/user.model.js";
// functions => public
import { hashString, tokenGenerator } from "../functions/public.js"

class AuthController {
  async register(req, res, next) {
    try {
      const { username, email, mobile, password } = req.body;
      // hashed password
      const hashedPassword = hashString(password);
      // registration of users
      const userRegistration = await UserModel.create({ username, email, mobile, password: hashedPassword });
      // registration successfully
      res.status(200).json({ status: 200, success: true, message: "user registration successfully" })  
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await UserModel.findOne({ username });
      if (!user) throw { status: 401, message: "username or password is incorrect" }
      // compare password
      const comparePasswordResult = bcrypt.compareSync(password, user.password);
      if (!comparePasswordResult) throw { status: 401, message: "username or password is incorrect" }
      // generate token
      const token = tokenGenerator({ username });
      user.token = token;
      user.save();
      // login successfully
      res.status(200).json({ status: 200, success: true, token });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController;
