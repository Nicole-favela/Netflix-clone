import * as dotenv from 'dotenv'

dotenv.config()
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import User from '../models/usermodel.js'


//controller for /register for new users
export const createUser = async (req, res) => {
    const {email, password} = req.body; //destructure data from req body
    try{
     
      const userExists = await User.findOne({ email: req.body.email });
      
      if (userExists) {
        console.log("user already exists")
        return res.status(406).json({ status: 'error', message: 'User email already exists, please login' });
      }
      console.log('user does not exist, creating user...')
       //if user does not exist, create new user
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
      res.status(201).json({status: 'success', message:"user created"})
  
    }
    catch(err){
      console.log("error when attempting to create user: " ,err)
      res.status(500).json({status: 'error', message: 'server error'})
  
    }
}

//controller for /login for existing users to log in 
export const loginUser = async (req, res) => {
    try{
        
        const {email, password} = req.body; //destructure data from req body
    
        //check if user exists
        const user = await User.findOne({ //create user with the hashed pw
          email: req.body.email,
        
        })
        if (!user){
            return res.status(406).json({error:"user not found"})
         
        }
        //check if user's password matches
        const matched = await bcrypt.compare(password, user.password)
        if (!matched){
          return res.status(400).json({error: 'password or user does not match, please try again'})
           
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
        console.log('Login error: ', err)
        res.status(500).json({error: 'server error'});
    
      }
    

}
