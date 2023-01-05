const userController = require('../controllers/user.controller');
const { autoLogin } = require('../middlewares/autoLogin');
const upload = require('../modules/multer');
const { imageValidator } = require('../validations/user');
const { expressValidatorMapper } = require('../middlewares/checkErrors');

const userRouter = require('express').Router();

// get all users
userRouter.get("/", userController.getAllUsers);

// get user profile
userRouter.get("/profile", autoLogin, userController.getProfile);

// update user
userRouter.put("/update", autoLogin, userController.updateUser);

// upload profile image
userRouter.put("/profile-image", autoLogin, upload.single("image"), imageValidator(), expressValidatorMapper, userController.uploadProfileImage);

module.exports = userRouter;