import express from 'express'
import mongoose from 'mongoose'
import {registerController} from '../controller/authController.js'
const router=express.Router()

//routing
//register|post
router.post('/register',registerController)
export default  router