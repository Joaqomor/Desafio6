import mongoose from "mongoose";

const UserCollection = "users";

const UserSchema = mongoose.Schema ({
    first_name : String,
    last_name : String,
    email:{
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    admin: {
        type: Boolean,
        required: true,
        default: false
    },
    loggedBy: {
        type: String,
        default: "local"
    
    }

});

const userModel = mongoose.model(UserCollection, UserSchema); 

export default userModel