// import { comparePassword,hassedPassword } from "./../helpers/authHelper.js";
// import usermodel from "../models/usermodel.js"
// export  const registerController=async(req,res) => {
//     try{
//         console.log(req.body); // Log the request body
//         const {name,email,password,phone,address}=req.body
//         //validation
//         if(!name ){
//              return res.send({error:'name is required'})

//     }
//     if(!email ){
//         return res.send({error:"email is required"})

// }
// if(!phone ){
//     return res.send({error:'phone nmumber is required'})

// }
// if(!password ){
//     return res.send({error:'password is required'})

// }
// if(!address ){
//     return res.send({error:'address  is required'})

// }
// //check existing user
// const existingUser=await usermodel.findOne({email})
// if(existingUser){
//     return res.status(200).send({success:true,message:'user already exists'})
// } 
// //register user
// const hasedPassword=await hassedPassword(password)
// const user=new usermodel({name,email,phone,address,password:hasedPassword}).save()
// res.status(201).send({success:true,
//     message:"user registered successfully",
//     user
// })

//     }

//     catch(error){console.log(error);
//         res.status(500).send({ success:false,message:"error in registration",error})

//     }
// };
import usermodel from "../models/usermodel.js";
import { comparePassword, hashPassword } from "./../helpers/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check user
    const exisitingUser = await usermodel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        adddress: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
