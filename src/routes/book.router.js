import express from "express";
import BooksM from "../dao/db/books.manager-db.js";

const booksM = new BooksM();
const router = express.Router();



router.get("/", async (req, res) => {
    try {
        const { limit =10, page = 1, query, sort} = req.query;
        const books = await booksM.getProducts({limit: parseInt(limit), page : parseInt(page), query, sort});
        res.json({
            status: 'success',
            payload: books,
            totalPages: books.totalPages,
            prevPage: books.prevPage,
            nextPage: books.nextPage,
            page: books.page,
            hasPrevPage: books.hasPrevPage,
            hasNextPage: books.hasNextPage,
            prevLink: books.hasPrevPage ? `/apibooks?limit=${limit}&page=${books.prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: books.hasNextPage ? `/apibooks?limit=${limit}&page=${books.nextPage}&sort=${sort}&query=${query}` : null,
        })
    } catch (error) {
        console.log("ERROR AL CARGAR LOS PRODUCTOS");
        res.status(500).json({ error: "Error al cargar los productos" });
    }
});

router.get("/:id", async (req, res) => {
    const id =req.params.id;

    try {
        const book = await booksM.getProductById(id);
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
        await booksM.addProduct(nuevoBook);
        res.status(201).json({ message: "Producto agregado" });
    }catch(error){
        res.status(500).json({ error: "Error al agregar el producto" });
    }
});

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    const bookActualizado = req.body;

    try{
        await booksM.updateProduct(id,bookActualizado);
        res.json({message: "Producto actualizado",})
    }catch(error){
        res.status(500).json({error: "Error al actualizar el producto"})
    }
});

router.delete("/:id", async (req, res) => {
    const id = req.params.id;

    try{
        await booksM.deleteProduct(id);
        res.json({message: "Producto eliminado"});
    }catch(error){
        res.status(500).json({error: "Error al eliminar el producto"});
    }
});

export default router;
