import express from "express";
import displayRoutes from "express-routemap";
import bookRoutes from "./routes/book.router.js";
import cartRoutes from "./routes/carts.routes.js";
const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/carts", cartRoutes);

app.listen(PUERTO, () =>{
    displayRoutes(app)
    console.log("Server running on port: " + PUERTO)
});





