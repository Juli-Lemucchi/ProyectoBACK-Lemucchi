import {promises as fs} from 'fs';

class CartsM{
    constructor(path){
        this.ultId = 0;
        this.path = path;
        this.carts = [];
        this.cargaCarritos();
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
        await fs.wrteFile(this.path, json.stringify(this.carritos, null, 2));
    }

    async createCart(){
        const nuevoCarrito={
            id: ++this.ultId,
            products: [],
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

    async addProducCarrito(cartId, productId, quantity=1){
        const carrito = await this.getCartById(cartId);
        const ProducEncontrado = carrito.products.find(i=>i.product===productId);

        if(ProducEncontrado){
            ProducEncontrado.quantity+=quantity;
        }else{
            carrito.products.push({product: productId, quantity});
        }

        await this.guardarCarritos();
        return carrito;
    }
}

export default CartsM