const { Router } = require("express");
const {
  registerUserController,
  loginUserController,
  authMeController,
} = require("../controllers/authControllers");
const checkAuth = require("../middleware/authMiddleware")
const authRouter = Router();


authRouter.get("/me", checkAuth, authMeController);

authRouter.post("/login", loginUserController);

authRouter.post("/register", registerUserController);



module.exports = authRouter;
