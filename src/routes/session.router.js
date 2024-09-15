import { Router } from "express";
//import UserModel from "../dao/model/user.model.js";
//import { createHash, isValidPassword } from "../util/util.js";
import passport from "passport";
//import jwt from "jsonwebtoken";
import UserController from "../controllers/user.controller.js";


const router = Router();

router.post("/register", UserController.registerUser);

router.post("/login", UserController.loginUser)

router.get("/current", passport.authenticate("jwt", { session: false }),UserController.current)

router.post("/logout", UserController.logoutUser)

export default router