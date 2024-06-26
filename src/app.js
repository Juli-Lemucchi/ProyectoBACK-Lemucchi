import express from "express";
import { engine } from "express-handlebars";
import { Server } from 'socket.io';
import displayRoutes from "express-routemap";
import bookRoutes from "./routes/book.router.js";
import cartRoutes from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";

const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));

app.engine("handlebars", engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use("/api/books", bookRoutes);
app.use("/api/carts", cartRoutes);
app.use("/", viewsRouter);


const httpServer = app.listen(PUERTO, () =>{
    displayRoutes(app)
    console.log("Server running on port: " + PUERTO)
});

import BooksM from "./controllers/booksM.js";
const booksMa = new BooksM("./src/modules/books.json");

const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("User conected")

    socket.emit("books", await booksMa.getProducts());

    socket.on("eliminarProduct", async (id) => {
        await booksMa.deleteProduct(id);
        io.socket.emit("products",await booksM.getProducts());
    })
    socket.on("agregarProduct", async (product) => {
        await booksMa.addProduct(product);
        io.socket.emit("products",await booksM.getProducts());
    })
})



