import {Router} from "express";
//import userModel from "../models/user.model.js";
//import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";

const router = Router();


// ++++++++++++++  Login con GitHub.  ++++++++++++++

    router.get("/github", passport.authenticate("github", {scope:["user:email"]}), async (req,res) => {} );

    router.get("/githubcallback", passport.authenticate("github", {failureRedirect: "/github/errorLogin"}), async (req,res) => {
        const user =req.user;
        req.session.user= {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age 
        };
        req.session.admin = true;
        res.redirect("/github");
        
    });



// ++++++++++++++  Registro y Login con passport.  ++++++++++++++

    router.post("/register", passport.authenticate("register", {failureRedirect: "/users/errorRegister"}),

    async (req,res) => {
        res.status(201).send({status:"success", msg:"user was created"});
    });


    router.post("/login", passport.authenticate("login",{failureRedirect:"/users/errorLogin"}),

    async (req,res) => {
        const user = req.user;
        console.log(user);

        if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});

        req.session.user= {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age 
        }

        console.log(req.session.user);
        res.send({status:"success", payload:req.session.user, message:"successful login" });
    });


    // ++++++++++++++  Registro y Login sin utilización de passport.  ++++++++++++++

    
    /* router.post("/register", async(req,res) =>{
        const {first_name, last_name,email,age,password} =req.body;
        console.log(req.body);

        
        if(exists){
            return res.status(400).send({status:"error", msg:"user already exists."})
        }const exists = await userModel.findOne({email});


        const user = {
            first_name,
            last_name,
            email,
            age,
            password: createHash(password)
        };

        const result = await userModel.create(user);
        res.status(201).send({status:"success", msg:"user was created whit ID:" + result.id});

    }); */


    /* router.post("/login", async (req, res)=>{
        const {email, password} = req.body;
        const user = await userModel.findOne({email}); 
        
        if(!user) return res.status(401).send({status:"error",error:"Incorrect credentials"});
        if(!isValidPassword(user,password)){
            return res.status(401).send({status:"error",error:"Incorrect credentials"});
        }

        
        
        req.session.user= {
            name : `${user.first_name} ${user.last_name}`,
            email: user.email,
            age: user.age 
        }

        console.log(req.session.user);
        res.send({status:"success", payload:req.session.user, message:"successful login" });
    }); */




export default router; 

