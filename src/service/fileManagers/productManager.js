import fs from "fs";
import { nanoid } from "nanoid";

export default class productManager {
    constructor() {
        this.path = "./src/utils/products.json"
    }

    readProducts = async () => {
        let products = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(products)
    };

    getProducts = async () => {
        return await this.readProducts()
        
    };

    addProducts = async (product) => {
        
        let oldProducts = await this.readProducts()
        product.id = nanoid()
        let allProducts = [...oldProducts, product]

        await fs.promises.writeFile(this.path, JSON.stringify(allProducts))
        console.log( "Product was added");

    }

    getProductsById = async (id) => {

        let products = await this.readProducts()
        let productById = products.find(product => product.id === id)

        return productById

        
    };

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(product => product.id === id)
    }

    deleteProductById = async (id) => {

        let productById = await this.readProducts()
        let productExist = productById.find(product => product.id === id)
        if (productExist) {
        let productFilter = productById.filter(products => products.id != id)
        await fs.promises.writeFile(this.path, JSON.stringify(productFilter));
        console.log("The product was deleted");
        return true
        }else {
        console.log("The product wasn't deleted"); 
        }


    };

    
    updateProducts = async (id, product) => {
        let productById = await this.readProducts()
        let productExist = productById.find(product => product.id === id)
        if (!productExist) return "The product wasn't updated"

        await this.deleteProductById(id)
        let oldProducts = await this.readProducts()

        let modifiedProduct = [{...product, id},...oldProducts]

        await fs.promises.writeFile(this.path, JSON.stringify(modifiedProduct));

        return "The product was updated"
        
        

    };


}

