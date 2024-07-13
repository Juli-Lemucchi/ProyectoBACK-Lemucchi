import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    products: {type:mongoose.Schema.Types.ObjectId, ref:"books", required:true},
    quantity: {type:Number, required:true}
});

cartSchema.pre('findOne', function(next) {
    this.populate('books.book', '_id title price');  
    next();  
})
const CartsModel = mongoose.model("carts", cartSchema);

export default CartsModel