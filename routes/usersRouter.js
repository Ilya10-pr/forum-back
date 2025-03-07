const { Router } = require("express");
const {
  updateDataUserController,
  resetPasswordController,
} = require("../controllers/usersControllers");
const checkAuth = require("../middleware/authMiddleware");

const usersRouter = Router();



usersRouter.put("/edit", checkAuth, updateDataUserController);
usersRouter.post("/reset/password", checkAuth, resetPasswordController);
// usersRouter.post("/information", checkAuth, postPhotoUserContrloller);
module.exports = usersRouter;
