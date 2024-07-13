import express from "express";
import CartsModel from "../dao/model/cart.model.js";
import CartsManager from "../dao/db/cart.manager-db.js";

const router = express.Router();
const cartsMa = new CartsManager();

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await CartsManager.createCart();
        res.json(nuevoCarrito);
    } catch (error) {
        console.log("ERROR AL CREAR EL CARRITO");
        res.status(500).json({ error: "Error al crear el carrito" });
    }
})

router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
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

router.post("/:cid/book/:id", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const bookId = parseInt(req.params.id);
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartsMa.addProducCarrito(cartId, bookId, quantity);
        res.json(actualizarCarrito.books);
    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});
export default router