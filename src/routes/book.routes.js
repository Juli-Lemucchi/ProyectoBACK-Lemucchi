import express from "express";
import BooksM from "../controllers/booksM.js";


const router = express.Router();
const booksMa = new BooksM("./src/models/books.json");


router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit;
        const books = await booksMa.getProducts();

        if(limit){
            res.json(books.slice(0, limit));
        }else{
            res.json(books);
        }
    } catch (error) {
        console.log("ERROR AL CARGAR LOS PRODUCTOS");
        res.status(500).json({ error: "Error al cargar los productos" });
    }
});
router.get("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const book = await booksMa.getProductById(id);
        if(!book){
            res.status(404).json({ error: "Producto no encontrado" });
        }
    }catch(error){
        res.status(500).json({ error: "Error al cargar el producto" });
    }

});
router.post("/", async (req, res) => {
    const nuevoBook = req.body;
    
    try{
        await booksMa.addProduct(nuevoBook);
        res.status(201).json({ message: "Producto agregado" });
    }catch(error){
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});
router.put("/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const bookActualizado = req.body;

    try{
        await booksMa.updateProduct(id,bookActualizado);
        res.json({message: "Producto actualizado",})
    }catch(error){
        res.status(500).json({error: "Error al actualizar el producto"})
    }
});
router.delete("/:id", async (req, res) => {
    const id = parseInt(req.params.id);

    try{
        await booksMa.deleteProduct(id);
        res.json({message: "Producto eliminado"});
    }catch(error){
        res.status(500).json({error: "Error al eliminar el producto"});
    }
});

export default router;
