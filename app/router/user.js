const UserController = require("../controllers/user.controller");
const { expressValidatorMapper } = require("../middlewares/checkErrors");
const fileUpload = require("express-fileupload");
const uploadFile = require("../modules/fileUpload");
const { checkMongoId } = require("../middlewares/checkMongoId");

const userRouter = require("express").Router();

// get all users
userRouter.get("/", UserController.getAllUsers);

// get user profile
userRouter.get("/profile", UserController.getProfile);

// get all requests
userRouter.get("/get-invite-requests", UserController.getAllRequests);

// get requests by status
userRouter.get("/get-requests-by-status/:status", UserController.getRequestsByStatus);

// change status requests
userRouter.get("/change-request-status/:id/:status", checkMongoId, UserController.changeRequestStatus);

// update user
userRouter.put("/update", UserController.updateUser);

// upload profile image
userRouter.put("/profile-image", fileUpload(), uploadFile, expressValidatorMapper, UserController.uploadProfileImage);


module.exports = userRouter;