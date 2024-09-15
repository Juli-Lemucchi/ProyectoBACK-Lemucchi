import CartsDao from "../dao/cart.dao.js";

class CartRepository {
    async createRepo() {
        return await CartsDao.create();
    }
}

export default new CartRepository()