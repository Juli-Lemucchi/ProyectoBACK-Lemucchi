import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


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

bookSchema.plugin(mongoosePaginate);

const BooksModel = mongoose.model("books", bookSchema);

export default BooksModel