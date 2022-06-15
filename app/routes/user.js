import { Router } from "express";
const userRouter = Router();
// middlewares
import { checkLogin } from "../middlewares/checkLogin.js";
import { expressValidatorMapper } from "../middlewares/errorsMapper.js";
// controllers
import UserController from "../controllers/user.controller.js";
// validations => user
import { editProfileValidator, uploadProfileImageValidator } from "../validations/user.validation.js";
// functions => upload-profile-image
import uploadProfileImage from "../functions/upload-profile-image.js"

userRouter.get("/profile", checkLogin, UserController.getProfile);
userRouter.put("/edit-profile", checkLogin, editProfileValidator(), expressValidatorMapper, UserController.editProfile);
userRouter.put("/upload-profile-image", uploadProfileImage.single("image"), uploadProfileImageValidator(), checkLogin, UserController.uploadProfileImage);
userRouter.get("/get-all-invite-requests", checkLogin, UserController.getAllInviteRequests);
userRouter.get("/change-request-status/:id/:status", checkLogin, UserController.changeRequestStatus)

export default userRouter;