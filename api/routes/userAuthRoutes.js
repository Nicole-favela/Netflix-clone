import {Router} from 'express'
import express from 'express'

import cors from 'cors'
import * as dotenv from 'dotenv'

import bodyParser from 'body-parser'
//import connect from '../db/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



import User from '../models/usermodel.js'

const router = Router();

router.post('/api/register', async (req, res)=>{
    const {email, password} = req.body; //destructure data from req body
  try{
    //check if user exists in system by getting data from front end
  
    //if user does not exist, create new user
    const userExists = await User.findOne({ email: req.body.email });
    console.log('user found')
    if (userExists) {
      console.log("user already exists")
      return res.status(406).json({ message: 'User already exists' });
    }
    console.log('user does not exist')

  }
  catch(err){
    res.json({status: 'error'})

  }

    //hash pw for new user
    const saltRounds = 10
    const salt =  bcrypt.genSaltSync(saltRounds);
    const hashedPw = bcrypt.hashSync(password, salt)
   
    //store user in db
    const user = await User({ //create user with the hashed pw
      email,
      password: hashedPw,
    
    })
    await user.save() //saved to db

    console.log('user saved')
    res.status(201).json({message:"user created"})

})
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
            res.json({message: "password does not match"})
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