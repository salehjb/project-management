const UserController = require("../controllers/user.controller");
const { autoLogin } = require("../middlewares/autoLogin");
const { expressValidatorMapper } = require("../middlewares/checkErrors");
const { imageValidator } = require("../validations/user");
const fileUpload = require("express-fileupload");
const uploadFile = require("../modules/fileUpload");

const userRouter = require("express").Router();

// get all users
userRouter.get("/", UserController.getAllUsers);

// get user profile
userRouter.get("/profile", autoLogin, UserController.getProfile);

// update user
userRouter.put("/update", autoLogin, UserController.updateUser);

// upload profile image
userRouter.put("/profile-image", autoLogin, fileUpload(), uploadFile, expressValidatorMapper, UserController.uploadProfileImage);

module.exports = userRouter;