import { Router } from "express";


const router = Router();

router.get("/login", (req,res) => {
    res.render("github-login")
});

router.get("/", (req,res) => {
    res.redirect("/products")
});

router.get("/errorLogin", (req,res) => {
    res.redirect("/errorLogin")
});


export default router;