import BooksModel from "../model/books.model.js";

class BooksM {

    async addProduct ({title, price, description, img, code, stock, category}){
        try{
            
            if(!title || !price || !description || !img || !code || !stock || !category){
                console.log("Todos los campos son obligatorios");
                return;
            }

            const bookExistente= await BooksModel.findOne({code:code});
            if(bookExistente){
                console.log("YA TENEMOS ESE LIBRO, NO PODEMOS AGREGARLO NUEVAMENTE");
                return;
            }

            const newBooks = new BooksModel({
                title,
                price,
                description,
                img,
                code,
                stock,
                category,
                status : true,
                thumbnail: thumbnail || []
            });
            await newBooks.save();
        }
        catch(error){
            console.log("ERROR AL AGREGAR PRODUCTO");
            throw error;
        }
    }
    async getProducts(){
        try{
            const skip = (page - 1)* limit;
            let queryOptions = {};

            if (query) {
                queryOptions = { category: query };
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const books = await BooksModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalBooks = await BooksModel.countDocuments(queryOptions);

            const totalPages = Math.ceil(totalBooks / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: books,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/books?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/books?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            }
        }
        catch(error){
            console.log("ERROR AL CARGAR ARCHIVO");
            throw error;
        }
    }    
    
    async getProductById(id){
        try{
           const buscado = await BooksModel.findById(id);
            if(!buscado){
                console.log("PRODUCTO NO ENCONTRADO");
                return null;
            }else{
                console.log("PRODUCTO ENCONTRADO");
                return buscado;
            }
        }catch(error){
            console.log("ERROR AL BUSCAR PRODUCTO POR ID");
            throw error;
        }
    }

    
    async updateProduct(id, bookActualizado){
        try{
            const book = await BooksModel.findByIdAndUpdate(id, bookActualizado);
            if(!book){
                console.log("PRODUCTO NO ENCONTRADO");
                return null;
            }else{
                console.log("PRODUCTO ACTUALIZADO");
                return book;
            }
        }catch(error){
            console.log("ERROR AL ACTUALIZAR PRODUCTO");
            throw error;
        }
    }
    async deleteProduct(id){
        try{
            const book = await BooksModel.findByIdAndDelete(id);
            if(!book){
                console.log("PRODUCTO NO ENCONTRADO");
                return null;
            }else{
                console.log("PRODUCTO ELIMINADO");
                return book;
            }
        }catch(error){
            console.log("ERROR AL ELIMINAR PRODUCTO");
            throw error;
        }
    }
}
export default BooksM;
