import express from "express";
import CartsM from "../controllers/cartsM.js";

const router = express.Router();
const cartsMa = new CartsM("./src/models/carts.json");

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
        res.json(carrito.products);
    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});

router.post("/:cid/product/:id", async (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.id);
    const quantity = req.body.quantity || 1;

    try {
        const actualizarCarrito = await cartsMa.addProducCarrito(cartId, productId, quantity);
        res.json(actualizarCarrito.products);
    } catch (error) {
        console.log("ERROR AL CARGAR EL CARRITO");
        res.status(500).json({ error: "Error al cargar el carrito" });
    }
});
export default router