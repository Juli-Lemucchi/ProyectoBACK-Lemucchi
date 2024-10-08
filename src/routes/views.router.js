import express from "express";
import BooksM from "../dao/db/books.manager-db.js";
import CartsM from "../dao/db/cart.manager-db.js";
import { soloAdmin, soloUser } from "../middleware/auth.js";
import passport from "passport";


const booksMa = new BooksM();
const cartsMa = new CartsM();
const router = express.Router();


router.get("/home", async (req, res) => {
    res.render("home");
})

router.get("/books",passport.authenticate("jwt", { session: false }), soloUser, async (req, res) => {
    try{
        const {page = 1, limit = 2} = req.query;
        const books = await booksMa.getProducts({page: parseInt(page), limit: parseInt(limit)});

        const nuevoArray = books.docs.map((book) => {
            const{_id,...rest}=book.toObject();
            return {...rest}
        })

        res.render("books",{
            books: nuevoArray,
            hasPrevPage: books.hasPrevPage,
            hasNextPage: books.hasNextPage,
            prevPage: books.prevPage,
            nextPage: books.nextPage,
            currentPage: books.page,
            totalPages: books.totalPages
        })
    }catch(error){
        console.log("ERROR AL CARGAR LOS PRODUCTOS");
        res.status(500).json({ error: "Error al cargar los productos" });
    }
})

router.get("/carts/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try{
        const cart = await cartsMa.getCartById(cartId);
        if(!cart){
            res.status(404).json({ error: "Carrito no encontrado" });
        }
        const bookEnCarrito = cart.books.map(i =>({
            books: i.books.toObject(),
            quantity: i.quantity
        }));

        res.render("carts", {books: bookEnCarrito});
    }catch(error){
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});
router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/rgister", (req, res) => {
    res.render("register");
})
router.get("/realtimeproducts", passport.authenticate("jwt", { session: false }),soloAdmin, (req, res) => {
    res.render("realTimeProducts");})

    
export default router