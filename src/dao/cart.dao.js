import CartsModel from "./model/cart.model.js";

class CartsDao {
    async create (){
        const newCart = new CartsModel();
        return await cart.save();
    }

}

export default new CartsDao()