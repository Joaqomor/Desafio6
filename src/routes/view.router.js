import { Router } from "express";
import ProductManager from "../service/mongoManagers/productManager.js";


const productManager = new ProductManager();
const router = Router();

router.get('/products',  async (req, res) => {
    const allProducts = await productManager.getProducts()
    res.render('home', {allProducts})
});

router.get('/session', (req, res)=>{
    if(req.session.counter){
        req.session.counter++;
        res.send(`You visited this website 4 ${req.session.counter} times` )
    }else{
        req.session.counter = 1; 
        res.send("Welcome!!")
    } 
})


export default router;