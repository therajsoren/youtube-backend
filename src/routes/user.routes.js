import { Router } from "express";
import {registerUser} from '../controllers/user.controllers.js';
import {upload} from '../middlewars/multer.middlewars.js'
import { verifyJWT } from "../middlewars/auth.middlewars.js";
import { loginUser } from "../controllers/user.controllers.js";
import { logoutUser } from "../controllers/user.controllers.js";
// ruter se routes bante hai

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },{
            name: "coverImage",
            maxCount: 2
        }
    ]), 
    registerUser)

router.route("/login").post(loginUser)

// secured routes

router.route("/logout").post(verifyJWT, logoutUser)

export default router; 