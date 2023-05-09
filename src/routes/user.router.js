import { Router } from "express";

const router = Router();

router.get("/login", (req,res) =>{
    res.render("login");
})

router.get("/register", (req,res)=>{
    res.render("register");
})

router.get("/", (req,res) =>{
    res.render("profile", { 
        user: req.session.user
    })
})

router.get("/errorRegister", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/errorLogin", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router