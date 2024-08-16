import mongoose from "mongoose";
import doenv from "dotenv";
doenv.config();


mongoose.connect(process.env.DB_URL)
    .then(() => {console.log("Conectado a la base de datos");})
    .catch((error) => {console.log(error);})