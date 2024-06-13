import express from "express";
import displayRoutes from "express-routemap";
import bookRoutes from "./routes/book.routes.js";
import cartRoutes from "./routes/cart.routes.js";
const app = express();
const PUERTO = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("api/books", bookRoutes);
app.use("api/carts", cartRoutes);

app.listen(PUERTO, () =>{
    displayRoutes(app)
    console.log("Server running on port: " + PUERTO)
});



/*import express from "express";
import displayRoutes from "express-routemap";
import usersRoutes from "./routes/user.routes.js";

const app = express();
const PUERTO = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", usersRoutes);

app.get("/", (req, res) => {
    res.send("Bienvenidos al himalaya")
})

app.listen(PUERTO, () =>{
    displayRoutes(app)
    console.log("Server running on port: " + PUERTO)
})*()*/


