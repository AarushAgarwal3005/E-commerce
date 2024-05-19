import express from 'express'
import colors from'colors'
import dotenv from 'dotenv';
import morgan from 'morgan'
import { connect } from 'mongoose';
import connectDB from './comfig/db.js';
import authRoutes from './routes/authRoutes.js'

//configure env
dotenv.config()
//database config
connectDB()
//rest object
const app=express();
//middlewear
app.use(express.json())
app.use(morgan('dev')); //logs incoming requests to the console in dev mode

app.use('/api/v1/auth',authRoutes)
//route 
app.get("/",(req,res)=>{
    res.send({message:"ecom app"});
})
// app.use(express())
 const port=process.env.port||8080;
 app.listen(port,()=>{
    console.log(`server runing on ${process.env.DEV_MODE} mode on ${port}`.bgCyan.white)
 })