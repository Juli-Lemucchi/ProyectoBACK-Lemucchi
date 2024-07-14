import CartsModel from "../../dao/model/cart.model.js";

class CartsM{
   

    async createCart(){
        try {
            const nuevoCarrito = new CartsModel({books:[]});
            await nuevoCarrito.save();
            return nuevoCarrito;
        } catch (error) {
            console.log("ERROR AL CREAR EL CARRITO");
            throw error;
        }
    }

    async getCartById(cartId){
        try{
            const carrito = await CartsModel.findById(cartId);
            if(!carrito){
            throw new Error("CARRITO"+cartId+"NO ENCONTRADO");
            }
            return carrito;
        }catch(error){
            console.error("ERROR AL CARGAR EL CARRITO");
            throw error;
        }            
    }

    async addProducCarrito(cartId, bookId, quantity=1){
        try {
            const carrito = await this.getCartById(cartId);
            const bookExistente = carrito.books.find(i=>i.book.toString()===bookId);

            if(bookExistente){
                bookExistente.quantity+=quantity;
            }else{
                carrito.books.push({book: bookId, quantity});
            }
            carrito.markModified("books");
            await carrito.save();
            return carrito;

        } catch (error) {
            console.error("ERROR AL AGREGAR PRODUCTO AL CARRITO");
            throw error;
        }
    }

    async deleteCart(cartId){
        try {
            const carrito = await CartsModel.findByIdAndDelete(cartId);
            return carrito;
        } catch (error) {
            console.error("ERROR AL ELIMINAR CARRITO");
            throw error;
        }
    }
}

export default CartsM