import mongoose from "mongoose";


mongoose.connect("mongodb+srv://Juli-Lemucchi:JNLmucchi13@dinobooks.90v1a4z.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=DinoBooks")
    .then(() => {console.log("Conectado a la base de datos");})
    .catch((error) => {console.log(error);})