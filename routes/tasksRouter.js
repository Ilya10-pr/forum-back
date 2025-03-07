const {Router} = require("express");
const {
  getTasksController,
  getTasksByIdController,
  createTaskController,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksControllers");
const passport = require("passport");
const checkAuth = require("../middleware/authMiddleware");


const tasksRouter = Router();

tasksRouter.get("/", checkAuth, getTasksController);

tasksRouter.get("/:id", checkAuth, getTasksByIdController);

tasksRouter.post("/", checkAuth, createTaskController);

tasksRouter.put("/:id", checkAuth, updateTaskController);

tasksRouter.delete("/:id", checkAuth, deleteTaskController);




module.exports = tasksRouter;