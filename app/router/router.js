const authRouter = require('./auth');
const userRouter = require('./user');
const projectRouter = require('./project');
const teamRouter = require('./team');

const router = require('express').Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/teams", projectRouter);
router.use("/projects", teamRouter);

module.exports = router;