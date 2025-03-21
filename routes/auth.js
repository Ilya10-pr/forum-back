import {Router } from "express";
import passport from "passport";
import { authMeController, loginUserController, registerUserController } from "../controllers/auth.js";


export const auth = Router();

auth.get("/me", passport.authenticate('jwt', { session: false }), authMeController);
auth.post("/register", registerUserController);
auth.post("/login", loginUserController);

