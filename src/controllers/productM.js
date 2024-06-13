import {promise as fs} from 'fs';

class ProductM {
    static ultId =0;

    constructor(path){
        this.products = [];
        this.path = path;
    }

    async addProduct ({title, price, description, img, code, stock, category}){
        try{
            const arrayProductos =await this.leerArchivo();
            if(!title || !price || !description || !img || !code || !stock || !category){
                console.log("Todos los campos son obligatorios");
                return;
            }
            if(arrayProductos.some(i=>i.code===code)){
                console.log("El producto ya existe");
                return;
            }

            const newProduct = {
                title,
                price,
                description,
                img,
                code,
                stock,
                category,
                status : true,
            };
            if (arrayProductos.length > 0) {
                ProductM.ultId= arrayProductos.reduce((maxId,product)=>Math.max)
            }
            newProduct.id=++ProductM.ultId;

            arrayProductos.push(newProduct);
            await this.guardarArchivo(arrayProductos);
        }
        catch(error){
            console.log("ERROR AL AGREGAR PRODUCTO");
            throw error;
        }
    }
    async getProducts(){
        try{
            const arrayProductos =await this.leerArchivo();
            return arrayProductos;
        }
        catch(error){
            console.log("ERROR AL LEER ARCHIVO");
            throw error;
        }
    }    
    
    async getProductById(id){
        try{
            const arrayProductos =await this.leerArchivo();
            const buscado = arrayProductos.find(i=>i.id===id);

            if(!buscado){
                console.log("PRODUCTO NO ENCONTRADO");
                return null;
            }else{
                console.log("PRODUCTO ENCONTRADO");
                return buscado;
            }
        }catch(error){
            console.log("ERROR AL BUSCAR PRODUCTO");
            throw error;
        }
    }

    async leerArchivo(){
        try{
            const respuesta = await fs.readFile(this.path, 'utf-8');
            const arrayProductos = JSON.parse(respuesta);
            return arrayProductos;
        }
        catch(error){
            console.log("ERROR AL LEER ARCHIVO",error);
            throw error;
        }
    }

    async guardarArchivo(arrayProductos){
        try{
            await fs.writeFile(this.path,JSON.stringify(arrayProductos,null,2));
        }
        catch(error){
            console.log("ERROR AL GUARDAR ARCHIVO",error);
            throw error;
        }
    }
    async updateProduct(id, productoActualizado){
        try{
            const arrayProductos =await this.leerArchivo();
            const index = arrayProductos.findIndex(i=>i.id===id);

            if(index===-1){
                arrayProductos[index]={...arrayProductos[index],...productoActualizado};
                await this.guardarArchivo(arrayProductos);
                console.log("PRODUCTO ACTUALIZADO");
            }else{
                console.log("PRODUCTO NO ENCONTRADO");
            }
        }catch(error){
            console.log("ERROR AL ACTUALIZAR PRODUCTO");
            throw error;
        }
    }
    async deleteProduct(id){
        try{
            const arrayProductos =await this.leerArchivo();
            const index = arrayProductos.findIndex(i=>i.id===id);
            if(index===-1){
                arrayProductos.splice(index,1);
                await this.guardarArchivo(arrayProductos);
                console.log("PRODUCTO ELIMINADO");
            }else{
                console.log("PRODUCTO NO ENCONTRADO");
            }
        }catch(error){
            console.log("ERROR AL ELIMINAR PRODUCTO");
            throw error;
        }
    }
}
export default ProductM;
