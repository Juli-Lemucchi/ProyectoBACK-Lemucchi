import mongoose from "mongoose";


const bookSchema = new mongoose.Schema({
    title:{type:String, required:true},
    price: {type:Number, required:true},
    description:{type:String, required:true},
    category: {type:String, required:true},
    img: String,
    code:{type:String, required:true, unique:true},
    stock:{type:Number, required:true},
    status:{type:Boolean, required:true},
    thumbnail:{type:[String]}
});

const BooksModel = mongoose.model("books", bookSchema);

export default BooksModel
