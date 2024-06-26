import {promises as fs} from 'fs';

class CartsM{
    constructor(path){
        this.ultId = 0;
        this.path = path;
        this.carts = this.cargaCarritos();
        
    }

    async cargaCarritos(){
        try{
            const data = await fs.readFile(this.path, 'utf-8');
            this.carts = JSON.parse(data);
            if(this.carts.length>0){
                this.ultId=Math.max(...this.carts.map(i=>i.id));
            }
        }catch(error){
            console.log("ERROR AL CARGAR LOS CARRITOS", error);
        }
    }

    async guardarCarritos(){
        await fs.writeFile(this.path, JSON.stringify(this.carritos, null, 2));
    }

    async createCart(){
        const nuevoCarrito={
            id: ++this.ultId,
            books: [],
        };
        this.carts.push(nuevoCarrito);
        await this.guardarCarritos();
        return nuevoCarrito;
    }

    async getCartById(cartId){
        try{
            const carrito = this.carts.find(i=>i.id===cartId);
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
        const carrito = await this.getCartById(cartId);
        const BookEncontrado = carrito.books.find(i=>i.book===bookId);

        if(BookEncontrado){
            BookEncontrado.quantity+=quantity;
        }else{
            carrito.books.push({book: bookId, quantity});
        }

        await this.guardarCarritos();
        return carrito;
    }
}

export default CartsM