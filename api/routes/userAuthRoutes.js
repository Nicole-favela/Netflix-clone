import {Router} from 'express'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



import User from '../models/usermodel.js'
import { createUser } from '../controllers/authController.js';

const router = Router();

router.post('/api/register', createUser)

router.post('/api/login', async (req, res)=>{
    try{
        //check if user exists in system by getting data from front end
        const {email, password} = req.body; //destructure data from req body
    
        //check if user exists
        
        const user = await User.findOne({ //create user with the hashed pw
          email: req.body.email,
        
        })
        if (!user){
          res.status(406).json({message:"user not found"})
         
          return
    
        }
        //check if user's password matches
        const matched = await bcrypt.compare(password, user.password)
        if (!matched){
          return res.status(400).send('password does not match')
           
        }
    
        //create jwt token
        const payload = {
          email: user.email,
          _id: user._id
    
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET)
      
        res.json({message: 'successfully logged in', token, user})
    
      }
      catch(err){
        //res.json({status: 'error'})
        res.status(500).send('server error');
    
      }
    
})
export default router