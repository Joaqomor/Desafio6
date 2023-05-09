import passport from "passport";
import passportlocal from "passport-local";
import GitHubStrategy from "passport-github2"
import userModel from "../models/user.model.js"; 
import { createHash, isValidPassword } from "../utils.js";

const localStrategy = passportlocal.Strategy

const initializePassport = () =>{


    passport.use("github", new GitHubStrategy(
        {
        clientID: "Iv1.d975f11c5ae917f1",
        clientSecret: "db5d8eac124fd0a09c0a76d833e1f43163b0527f",
        callbackUrl: "http://localhost:8080/api/sessions/githubcallback"
    },

    async(accesToken, refreshToken, profile, done) =>{
        console.log(profile);

        try {

            const user = await userModel.findOne({email: profile._json.email});
            console.log(user);

            if (!user){
            console.log("user doesn't exists");

            let newUser = {
                first_name: profile._json.name,
                last_name: "",
                age: 18,
                email: profile._json.email,
                password:"",
                loggedBy:"GitHub"
            };

            const result = await userModel.create(newUser);
            return done(null,result);

        }else{
            return done(null,user);
        }
            
        } catch (error) {

            return done(error);
            
        }
        
    }));



    passport.use("register", new localStrategy(
        
        {passReqToCallback: true, usernameField: "email"},
        async(req,username,password,done) =>{
            const { first_name, last_name, email, age} = req.body;
            try {

                const exists = await userModel.findOne({email});

                if(exists){
                    console.log("user already exists.");
                    return done(null,false);
                    
                }
            
                const user = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                };
            
                const result = await userModel.create(user);
                return done(null,result)
                
            } catch (error) {

                return done("Something went wrong" + error);
                
            }
        }
    ));


    passport.use ("login", new localStrategy(
        {passReqToCallback: true, usernameField: "email"},
        async(req,username,password,done) =>{
            try {
                const user = await userModel.findOne({ email: username})

                if (!user){
                    console.warn("User doesn't exists");
                    return done(null,false);
                }
                if(!isValidPassword(user,password)) {
                    console.warn("Incorrect credentials");
                    return done(null,false);

                }
                return done(null,user)
                
            } catch (error) {

                return done(error);
                
            }

        }));



        passport.serializeUser((user,done) =>{
            done(null,user._id);
        });

        passport.deserializeUser(async(id,done) => {
            try {

                let user = await userModel.findById(id);
                done(null,user);
                
            } catch (error) {

                console.error(error);
                
            }
        });

}



export default initializePassport;