import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import session from "express-session";
import viewRouter from "./routes/view.router.js";
import userRouter from "./routes/user.router.js"
import sessionsRouter from "./routes/sessions.router.js"
import githubLogin from "./routes/github-login.router.js"
import mongoose from 'mongoose';
import MongoStore from "connect-mongo";
import passport from "passport";
import initializePassport from "./config/passport.config.js";



const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded( {extended : true}));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.static(__dirname + "/public")); 
 


const URI = 'mongodb://127.0.0.1:27017/PlantaTuHogar?retryWrites=true&w=majority';

app.use(session({
    store:MongoStore.create({
        mongoUrl:URI,
        mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 40
    }),
    secret:"CoderS3cret", 
    resave: false,
    saveUninitialized: true
}))


initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//app.use('/api/carts', cartsRouter);
//app.use('/api/products', productsRouter);
app.use("/", viewRouter)
app.use("/users", userRouter)
app.use("/api/sessions", sessionsRouter) 
app.use("/github", githubLogin)

const connectMongoDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Conected to mongoDB.');
    } catch (error) {
        console.log('Error whit mongoDB.');
        console.log(error)
    }
};

connectMongoDB();

app.listen(PORT, ()  => {
    console.log(`Express server running on local host : ${PORT}.`);
}); 