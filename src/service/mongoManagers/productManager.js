import { productsModel } from '../../models/products.model.js';

export default class ProductManager {
    async addProduct(product) {
        try {
            const newProduct = await productsModel.create(product);
            return newProduct
        } catch (error) {
            console.log(error)
        }
    }

    getProducts = async () =>{
        const products = await productsModel.find().lean()
        return products
    }

  

    async getProductById(id){
        try {
            const product = productsModel.findById(id);
            return product
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct(id, newProduct){
        try {
            const updatedProduct = await productsModel.findByIdAndUpdate(id, {
                title: newProduct.title,
                description: newProduct.description,
                price: newProduct.price,
                thumbnail: newProduct.thumbnail, 
                code: newProduct.code,
                stock: newProduct.stock,
                category: newProduct.category
            }, { new: true });
            updatedProduct.save();
            return updatedProduct
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProduct(id){
        try {
            const deletedProduct = await productsModel.findByIdAndDelete(id);
            return deletedProduct
        } catch (error) {
            console.log(error)
        }
    }
}