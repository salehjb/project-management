const authRouter = require("./auth");
const userRouter = require("./user");
const teamRouter = require("./team");
const projectRouter = require("./project");
const { autoLogin } = require("../middlewares/autoLogin");

const router = require("express").Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/teams", teamRouter);
router.use("/projects", autoLogin, projectRouter);

module.exports = router;