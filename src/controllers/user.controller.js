import  UserService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {

    async registerUser(req, res) {
        const {name, lastname, age, email, password} = req.body;

        try {
            const newUser = await UserService.registerUser({name, lastname, age, email, password});
            const token =jwt.sign({
                user: `${newUser.name} ${newUser.lastname}`,
                email: newUser.email,
                role : newUser.rol
            }, "dinoSecretKey", {expiresIn: "1h"});
        res.cookie("dinoCookiesToken", token, {maxAge: 3600000, httpOnly: true})
        res.redirect("/api/sessions/current")
        }catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    async loginUser(req, res) {
        const {email, password} = req.body;
        try {
            const user = await UserService.loginUser(email, password);
            const token =jwt.sign({
                user: `${user.name} ${user.lastname}`,
                email: user.email,
                role : user.rol
            }, "dinoSecretKey", {expiresIn: "1h"});
            res.cookie("dinoCookiesToken", token, {maxAge: 3600000, httpOnly: true})
            res.redirect("/api/sessions/current")
        }
        catch (error) {
            res.status(400).json({message: error.message})
        }
    }
    async current (req, res) {
        if(req.user){
            const user = new UserDTO(user)
            res.send("home",{user: UserDTO})
        }else{
            res.status(401).json({ message: "No autorizado" });
        }
    }
    async logoutUser (req, res) {
        res.clearCookie("dinoCookiesToken");
        res.redirect("/login")
    }
}