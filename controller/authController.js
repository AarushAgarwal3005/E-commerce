import { comparePassword,hassedPassword } from "./../helpers/authHelper.js";
import usermodel from "../models/usermodel.js"
export  const registerController=async(req,res) => {
    try{
        console.log(req.body); // Log the request body
        const {name,email,password,phone,address}=req.body
        //validation
        if(!name ){
             return res.send({error:'name is required'})

    }
    if(!email ){
        return res.send({error:"email is required"})

}
if(!phone ){
    return res.send({error:'phone nmumber is required'})

}
if(!password ){
    return res.send({error:'password is required'})

}
if(!address ){
    return res.send({error:'address  is required'})

}
//check existing user
const existingUser=await usermodel.findOne({email})
if(existingUser){
    return res.status(200).send({success:true,message:'user already exists'})
} 
//register user
const hasedPassword=await hassedPassword(password)
const user=new usermodel({name,email,phone,address,password:hasedPassword}).save()
res.status(201).send({success:true,
    message:"user registered successfully",
    user
})

    }

    catch(error){console.log(error);
        res.status(500).send({ success:false,message:"error in registration",error})

    }
};
