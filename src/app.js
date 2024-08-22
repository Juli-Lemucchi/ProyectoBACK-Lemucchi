import express from "express";
import exphbs  from "express-handlebars";
import "./database.js"

import { Server } from 'socket.io';
import displayRoutes from "express-routemap";
import BooksM from "./dao/fs/controllers/booksM.js";
import passport from "passport";
import inicialicePassport from "./config/passport.config.js";
import cookieParser from "cookie-parser";

import bookRoutes from "./routes/book.router.js";
import cartRoutes from "./routes/carts.router.js";
import viewsRouter from "./routes/views.router.js";
import sessionRouter from "./routes/session.router.js";


const app = express();
const PUERTO = 3110;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./src/public"));
app.use(cookieParser());
app.use(passport.initialize());
inicialicePassport();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use("/api/books", bookRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);


const httpServer = app.listen(PUERTO, () =>{
    displayRoutes(app)
    console.log("Server running on port: " + PUERTO)
});




const booksMa = new BooksM("./src/modules/books.json");
const io = new Server(httpServer);

io.on("connection", async (socket) => {
    console.log("User conected")

    socket.emit("books", await booksMa.getProducts());

    socket.on("eliminarProduct", async (id) => {
        await booksMa.deleteProduct(id);
        io.emit("books",await booksMa.getProducts());
    })
    socket.on("agregarProduct", async (product) => {
        await booksMa.addProduct(product);
        io.emit("books",await booksMa.getProducts());
    })
})



