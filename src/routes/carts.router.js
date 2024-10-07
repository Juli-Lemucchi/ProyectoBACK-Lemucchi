import express from "express";
import CartsModel from "../dao/model/cart.model.js";
import CartsManager from "../dao/db/cart.manager-db.js";
import BooksModel from "../dao/model/books.model.js";
import UserModel from "../dao/model/user.model.js";
import TicketModel from "../dao/model/tickets.model.js";
import { calcuTotal } from "../utils/util.js";

const router = express.Router();
const cartsMa = new CartsManager();

router.get("/", async (req, res) => {
    
    try {

        const carts = await CartsModel.find();
        res.status(200).json(carts)
        
    } catch (error) {
        console.log("ERROR AL CREAR EL CARRITO");
        console.log(error)
        res.status(500).json({ error: "Error al crear el carrito" });
    }
})

router.post("/", async (req, res) => {
    try {

        const nuevoCarrito = await CartsModel.create({
            products:[]
        });

        res.json(nuevoCarrito);
    } catch (error) {
        console.log("ERROR AL CREAR EL CARRITO");
        console.log(error)
        res.status(500).json({ error: "Error al crear el carrito" });
    }
})

router.get("/:cid", async (req, res) => {
    const cartId = req.params.cid;
    try {
        const carrito = await CartsModel.findById(cartId)
            
        if (!carrito) {
            console.log("No existe ese carrito con el id");
            return res.status(404).json({ error: "Carrito no encontrado" });
        }

        return res.json(carrito.books);
    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});

router.post("/:cid/book/:bid", async (req, res) => {

    const cartId = req.params.cid;
    const bookId = req.params.bid;

    console.log(cartId)
    console.log(bookId)

    try {

        const cart = await CartsModel.findOne({_id:cartId});

        const productIndex = cart.products.findIndex( book => book.idProduct._id == bookId);

        console.log(productIndex)

        if(productIndex == -1){

            cart.products.push({
                idProduct:bookId,
                quantity:1
            });

        }else{

            cart.products[productIndex] = {
                idProduct:bookId,
                quantity: cart.products[productIndex].quantity + 1
            };

        }

        await cart.save();

        res.status(200).json(cart)

    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        console.log(error)
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});

router.delete("/:cid", async (req, res) => {
    const cartId =req.params.cid;
    try {
        await CartsModel.findByIdAndDelete(cartId);
        res.json({ message: "Carrito eliminado" });
    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }   
})

router.get("/:cid/purchase", async (req, res) => {
    const cartId = req.params.cid;
    try {
        const carrito = await CartsModel.findById(cartId)
        const arrayBooks = carrito.books;
        for (const item of arrayBooks) {
            const bookId =item.books;
            const books = await BooksModel.findById(bookId);
            if(books.stock >= item.quantity){
                books.stock -= item.quantity;
                await books.save();
            }else{
                booksNoDisponibles.push(bookId);
            }

        const userCart = await UserModel.findOne({cart: cartId});
        const ticket = new TicketModel({
            purchase_datetime: new Date(),
            amount: calcuTotal(cart.books),
            purchaser:userCart.email
        })
        ticket.save();
        }

        cart.books = cart.books.filter(item => booksNoDisponibles.some (bookId => bookId.equals(item.book)))
        await cart.save();

        res.json({message: "Carrito comprado", 
            ticket:{
                id: ticket._id,
                amount: ticket.amount,
                purchaser: ticket.purchaser
            },
            booksNoDisponibles
        })
    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
})


export default router