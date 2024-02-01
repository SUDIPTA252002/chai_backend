import { Router } from "express";
import { registerUser } from "../controllers/user.controlles.js";
import { upload } from "../middlewares/multer.middleware.js";
const router=Router()

router.route("/register").post(
    upload.fields([
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverimage",
            maxCount:1
        }]),
    registerUser
    )
//router.route("/login",loginUser)


export default router