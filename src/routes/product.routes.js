import express from "express";
import ProductM from "../controllers/productM.js";


const router = express.Router();
const productMa = new ProductM("./src/models/product.json");


router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const productos = await productMa.getProducts();

        if(limit){
            res.json(productos.slice(0, limit));
        }else{
            res.json(productos);
        }
    } catch (error) {
        console.log("ERROR AL CARGAR LOS PRODUCTOS");
        res.status(500).json({ error: "Error al cargar los productos" });
    }
});
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const producto = await productMa.getProductById(id);
        if(!producto){
            res.status(404).json({ error: "Producto no encontrado" });
        }
    }catch(error){
        res.status(500).json({ error: "Error al cargar el producto" });
    }

});
router.post("/", async (req, res) => {
    const nuevoProducto = req.body;
    
    try{
        await productMa.addProduct(nuevoProducto);
        res.status(201).json({ message: "Producto agregado" });
    }catch(error){
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const productoActualizado = req.body;

    try{
        await productMa.updateProduct(id,productoActualizado);
        res.json({message: "Producto actualizado",})
    }catch(error){
        res.status(500).json({error: "Error al actualizar el producto"})
    }
});
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        await productMa.deleteProduct(id);
        res.json({message: "Producto eliminado"});
    }catch(error){
        res.status(500).json({error: "Error al eliminar el producto"});
    }
});

export default router;
