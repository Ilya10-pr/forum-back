import { Router } from "express";
import {auth} from "./auth.js";
import { user } from "./user.js";
import { topic } from "./topic.js";


export const router = Router()

router.use("/auth", auth);
router.use("/user", user)
router.use('/topic', topic)
