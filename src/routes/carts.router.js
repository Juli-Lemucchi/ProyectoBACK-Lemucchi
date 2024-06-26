import express from "express";
import CartsM from "../controllers/cartsM.js";

const router = express.Router();
const cartsMa = new CartsM("./src/modules/carts.json");

router.post("/", async (req, res) => {
    try {
        const nuevoCarrito = await cartsMa.createCart();
        res.json(nuevoCarrito);
    } catch (error) {
        console.log("ERROR AL CREAR EL CARRITO");
        res.status(500).json({ error: "Error al crear el carrito" });
    }
})
router.get("/:cid", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    try {
        const cart = await cartsMa.getCartById(cartId);
        res.json(carrito.books);
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