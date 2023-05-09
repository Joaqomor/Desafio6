import fs from "fs";
import { nanoid } from "nanoid";
import productManager from "./productManager.js";

const productList = new productManager

export default class cartManager {
    constructor() {
        this.path = "./utils/carts.json";
    } 

    readCarts = async () => {
        let carts = await fs.promises.readFile(this.path, "utf-8")
        return JSON.parse(carts);
    };

    
    addCarts = async () => {
        
        let oldCarts = await this.readCarts()
        let id = nanoid()
        let allCarts = [{id : id, products : []}, ...oldCarts, ]

        await fs.promises.writeFile(this.path, JSON.stringify(allCarts))
        return "Cart was added"

    };

    getCartsById = async (id) => {
        let carts = await this.readCarts()
        let cartById = carts.find(cart => cart.id === id)

        return cartById
  
    };

    exist = async (id) => {
        let cart = await this.readCarts();
        return cart.find(cart => cart.id === id)
    }

    addProductToCart = async (cid,pid) =>{
        let carts = await this.readCarts()
        let cartById = await this.exist(cid)
        if (!cartById) return "Cart doesn't found"
        let productById = await productList.exist(pid)
        if (!productById) return "product doesn't found"

        let cartFilter = carts.filter(cart => cart.id != cid) 

        if (cartById.products.some(prod => prod.id === pid)){
        let productInCart = cartById.products.find(product => product.id === pid)
        productInCart.quantity++
        let addProductRepeated = [cartById, ...cartFilter]
        await fs.promises.writeFile(this.path, JSON.stringify(addProductRepeated))
        return "the product was added to the quantity"}

        cartById.products.push({id: productById.id, quantity : 1 })
       
        let cartsConcat = [cartById, ...cartFilter]
        await fs.promises.writeFile(this.path, JSON.stringify(cartsConcat))
        return "the product added to the cart" 

    }

}    
