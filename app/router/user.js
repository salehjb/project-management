const userController = require('../controllers/user.controller');
const { autoLogin } = require('../middlewares/autoLogin');

const userRouter = require('express').Router();

// get all users
userRouter.get("/", userController.getAllUsers);

// get user profile
userRouter.get("/profile", autoLogin, userController.getProfile)

module.exports = userRouter;