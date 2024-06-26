import {promises as fs} from 'fs';

class BooksM {
    static ultId =0;

    constructor(path){
        this.books = [];
        this.path = path;
    }

    async addProduct ({title, price, description, img, code, stock, category}){
        try{
            const arrayBooks =await this.leerArchivo();
            if(!title || !price || !description || !img || !code || !stock || !category){
                console.log("Todos los campos son obligatorios");
                return;
            }
            if(arrayBooks.some(i=>i.code===code)){
                console.log("YA TENEMOS ESE LIBRO, NO PODEMOS AGREGARLO NUEVAMENTE");
                return;
            }

            const newBooks = {
                title,
                price,
                description,
                img,
                code,
                stock,
                category,
                status : true,
            };
            if (arrayBooks.length > 0) {
                BooksM.ultId= arrayBooks.reduce((maxId,book)=>Math.max)
            }
            newBooks.id=++BooksM.ultId;

            arrayBooks.push(newBooks);
            await this.guardarArchivo(arrayBooks);
        }
        catch(error){
            console.log("ERROR AL AGREGAR PRODUCTO");
            throw error;
        }
    }
    async getProducts(){
        try{
            const arrayBooks =await this.leerArchivo();
            return arrayBooks;
        }
        catch(error){
            console.log("ERROR AL LEER ARCHIVO");
            throw error;
        }
    }    
    
    async getProductById(id){
        try{
            const arrayBooks =await this.leerArchivo();
            const buscado = arrayBooks.find(i=>i.id===id);

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
            const arrayBooks = JSON.parse(respuesta);
            return arrayBooks;
        }
        catch(error){
            console.log("ERROR AL LEER ARCHIVO",error);
            throw error;
        }
    }

    async guardarArchivo(arrayBooks){
        try{
            await fs.writeFile(this.path,JSON.stringify(arrayBooks,null,2));
        }
        catch(error){
            console.log("ERROR AL GUARDAR ARCHIVO",error);
            throw error;
        }
    }
    async updateProduct(id, bookActualizado){
        try{
            const arrayBooks =await this.leerArchivo();
            const index = arrayBooks.findIndex(i=>i.id===id);

            if(index !==-1){
                arrayBooks[index]={...arrayBooks[index],...bookActualizado};
                await this.guardarArchivo(arrayBooks);
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
            const arrayBooks =await this.leerArchivo();
            const index = arrayBooks.findIndex(i=>i.id===id);
            if(index !==-1){
                arrayBooks.splice(index,1);
                await this.guardarArchivo(arrayBooks);
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
export default BooksM;
