import {Router } from "express";

const router = Router();

router.get("/realtimeproducts", async (req, res) => {
    res.render("realtimeproducts");
})


import BooksM from "../controllers/booksM";
const booksMa = new BooksM("./src/modules/books.json");


router.get("/", async (req, res) => {
    try{
        const books = await booksMa.getProducts();

        res.render("home", {books});
    }catch(error){
        console.log("ERROR AL CARGAR LOS PRODUCTOS");
        res.status(500).json({ error: "Error al cargar los productos" });
    }
})

export default router