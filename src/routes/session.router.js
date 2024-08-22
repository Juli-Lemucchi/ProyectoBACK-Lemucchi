import { Router } from "express ";
import UserModel from "../dao/model/user.model.js";
import { createHash, isValidPassword } from "../util/util.js";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = Router();

router.post("/register", async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const existUser = await UserModel.findOne({ usuario });
        if (existUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }
        const newUser = new UserModel({
            usuario,
            password: createHash(password),
        });
        await newUser.save();
        res.status(201).json({ message: "Usuario creado exitosamente" });

        const token = jwt.sign({usuario: newUser.usuario, rol: newUser.rol}, "dinoSecretKey",{expiresIn:"1h"})

        res.cookie("dinoCookiesToken", token, {maxAge: 3600000, httpOnly: true})


        res.redirect("api/sessions/current")

    } catch (error) {
        res.status(500).json({ message: "Error al crear el usuario" });
    }
})

router.post("/login", async (req, res) => {
    const { usuario, password } = req.body;
    try {
        const existenteUser = await UserModel.findOne({ usuario });
        if (!existenteUser) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
        if(!isValidPassword(password, existenteUser)){
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }
    }    
    catch (error) {
        res.status(500).json({ message: "Error al iniciar sesión" });
    }
})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
    if(req.user){
        res.send("home",{usuario: req.user.usuario})
    }else{
        res.status(401).json({ message: "No autorizado" });
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie("dinoCookiesToken");
    res.redirect("/login")
})

router.get("/admin", passport.authenticate("jwt", { session: false }), (req, res) => {
    if(req.user.rol == "admin"){
        res.render("admin")
    }else{
        res.status(401).json({ message: "No autorizado" });
    }
})

export default router