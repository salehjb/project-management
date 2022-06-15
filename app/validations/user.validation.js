import { body } from "express-validator";
import path from "path";
// models
import UserModel from "../models/user.model.js";

export function editProfileValidator() {
  return [
    body("first_name").notEmpty().withMessage("first name cannot be empty"),
    body("last_name").notEmpty().withMessage("last name cannot be empty"),
    body("email").isEmail().withMessage("please enter a valid email address").custom(async (email, ctx) => {
       const userExistWithEmail = await UserModel.findOne({ email });
       if (userExistWithEmail) throw "email already in use";
       return true;
    }),
    body("mobile").isMobilePhone("fa-IR").withMessage("please enter a valid mobile phone").custom(async (mobile, ctx) => {
      const userExistWithMobile = await UserModel.findOne({ mobile });
      if (userExistWithMobile) throw "mobile already in use";
      return true;
    })
  ]
}

export function uploadProfileImageValidator() {
  return [
    body("image").custom((image, ctx) => {
      // image exist
      if (ctx.req.file === undefined) throw "please choose an image";
      // get image extension
      const extension = path.extname(ctx.req.file.originalname);
      // valid extensions
      const validExtensions = [".png", ".jpg", ".jpeg", ".gif", ".webp"].includes(extension);
      if (!validExtensions) throw "unfortunately, the extension of the photo you are looking for is not supported";
      // file size validation
      const maxSize = 4 * 1024 * 1024;
      if (ctx.req.file.size > maxSize) throw "the size of your photo is more than 4 megabytes. Please select a smaller photo";
      return true;
    })
  ]
}