// functions => public
import { verifyToken } from "../functions/public.js";
// models
import UserModel from "../models/user.model.js";

export async function checkLogin(req, res, next) {
  try {
    const Authorization = req.headers.authorization || undefined;
    if (!Authorization) throw { status: 401, message: "please login your account" }
    let token = Authorization.split(" ")[1];
    if (!token) throw { status: 401, message: "please login your account" }
    const result = verifyToken(token);
    const { username } = result;
    const user = await UserModel.findOne({ username }, { password: 0, token: 0 });
    if (!user) throw { status: 401, message: "please login your account" }
    req.user = user;
    next()
  } catch (error) {
    next(error);
  }
}
