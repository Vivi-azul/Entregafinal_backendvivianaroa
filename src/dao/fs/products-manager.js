import fs from 'fs/promises';
import CartModel from '../models/cart.model';

class ProductManager {
    static ultId = 0;

    constructor(path) {
        this.products = [];
        this.path = path;
    }

    async addProduct({title, description, precio, code, stock, category}) {
        try {
            const arrayProducts = await this.leerArchivo();
        
        if (!title || !description || !precio || !code || !stock || !category) {
            console.log("Todos los campos son obligatorios!!");
            return;
        }

        if (arrayProducts.some(item => item.code === code)) {
            console.log("El código debe ser único");
            return;
        }

        const nuevoProducto = {
            title,
            description,
            precio,
            code,
            stock,
            category,
            status: true
        };

        if (arrayProducts.length > 0) {
            ProductManager.ultId = arrayProducts.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        }

        nuevoProducto.id = ++ProductManager.ultId;

        arrayProducts.push(nuevoProducto);
        
        await this.guardarArchivo(arrayProducts);
        } catch (error) {
            console.log("Error al agregar producto", error);
            throw error;
        }
    }

    async getProducts(filter, options) {
        try {
            const arrayProducts = await this.leerArchivo();
            console.log("Productos leídos:", arrayProducts);
            return {
                docs: arrayProducts,   
                totalPages: 1,          
                prevPage: null,
                nextPage: null,
                page: 1,
                hasPrevPage: false,
                hasNextPage: false
            };
        } catch (error) {
            console.log("Error al leer el archivo", error);
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const arrayProducts = await this.leerArchivo();
            const producto = arrayProducts.find(item => item.id === id);
            if (!producto) {
                console.error("Not Found");
                return null;
            } else {
                console.log("Producto encontrado");
                return producto;
            }
        } catch (error) {
            console.log("Error al obtener el producto: ", error);
            throw error;
        }
    }

    async updateProduct(id, updatedFields) {
        try {
            const arrayProducts = await this.leerArchivo();
            const index = arrayProducts.findIndex(item => item.id === id);
            if (index === -1) {
                console.error("Producto no encontrado");
                return null;
            }

            const productoActualizado = { ...arrayProducts[index], ...updatedFields, id };

            arrayProducts[index] = productoActualizado;
            await this.guardarArchivo(arrayProducts);
            return productoActualizado;
        } catch (error) {
            console.log("Error al actualizar el producto: ", error);
        }
    }

    async deleteProduct(id) {
        try {
            const arrayProducts = await this.leerArchivo();
            const index = arrayProducts.findIndex(item => item.id === id);
            if (index === -1) {
                console.error("Producto no encontrado");
                return null;
            }

           arrayProducts.splice(index, 1);
            await this.guardarArchivo(arrayProducts);
            console.log(`Producto con ID ${id} eliminado.`);
            return true;
        } catch (error) {
            console.log("Error al eliminar el producto: ", error);
            return false;
        }
    }

    async guardarArchivo(arrayProducts) {
        try {
            await fs.writeFile(this.path, JSON.stringify(arrayProducts, null, 2));
        } catch (error) {
            console.log("Error al guardar el archivo: ", error);
            throw error;
        }
    }

    async leerArchivo() {
        try {
            const respuesta = await fs.readFile(this.path, "utf-8");
            const arrayProducts = JSON.parse(respuesta);
            return arrayProducts;
        } catch (error) {
            if (error.code === 'ENOENT') {
                console.log("El archivo no existe, se creará uno nuevo.");
                await this.guardarArchivo([]);
                return [];
            } else {
                console.log("Error al leer el archivo: ", error);
                throw error;
            }
        }
    }
}

export default ProductManager;