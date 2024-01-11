import { Router } from "express";
import { registerUser } from "../controllers/user.controlles.js";

const router=Router()

router.route("/register").post(registerUser)
//router.route("/login",loginUser)


export default router