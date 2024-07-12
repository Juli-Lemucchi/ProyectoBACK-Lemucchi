import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {type:mongoose.Schema.Types.ObjectId, ref:"books", required:true},
    quantity: {type:Number, required:true}
});

const CartsModel = mongoose.model("carts", cartSchema);

export default CartsModel