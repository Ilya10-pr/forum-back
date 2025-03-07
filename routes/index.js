const {Router} = require("express");
const tasksRouter = require("./tasksRouter");
const authRouter = require("./authRouter");
const usersRouter = require("./usersRouter")
const router = Router();


router.use("/tasks", tasksRouter);
router.use("/auth", authRouter);
router.use("/users", usersRouter);

module.exports = router;