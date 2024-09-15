import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({ 

    name:{type:String, required:true},  
    lastName:{type:String, required:true},
    age:{type:Number, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    cart: {type: mongoose.Schema.Types.ObjectId, ref: "carts"},
    rol: {
        type:String,
        enum: ["admin", "user"],
        default: "user"
    }
});

const UserModel = mongoose.model("users", usuarioSchema);

export default UserModel