import mongoose, { Schema,models,model } from "mongoose";

const UserSchema = new Schema(
    {
        email:{
            type:String,
            unique:[true,"Email already exists!"],
            required:[true,"username is required"]
        },
        username :{
            type:String,
            required:[true,"UserName is required!"],
            unique:[true, "Username alrady exists"]
        },
        image:{
            type:String,
        }
    }
)

const User = models.User || model("User",UserSchema)
export default User;
