import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({

    products:[{

        _id:false,
        idProduct:{
            type:mongoose.Types.ObjectId,
            ref:"books",
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        }
    }],

},{

    versionKey:false,
    timestamps:true

});

cartSchema.pre('findOne', function(next) {
    this.populate('products.idProduct', '_id title price');  
    next();  
})
const CartsModel = mongoose.model("carts", cartSchema);


export default CartsModel;
