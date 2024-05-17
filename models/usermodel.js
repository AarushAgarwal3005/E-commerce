import mongoose from "mongoose";
const userSchema= new mongoose.Schema({
    name:{type:String,
        required:true,
        trim:true


    },
    email:{
        required:true,unique:true,type:email
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,

    },
    role:{ type:Number,
        default:0

    }




},{timestamps:true})
export default mongoose.model('users',userSchema)