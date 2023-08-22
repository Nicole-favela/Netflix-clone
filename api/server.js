import express from 'express'

import cors from 'cors'
import * as dotenv from 'dotenv'

import bodyParser from 'body-parser'
import connect from './db/mongodb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


import User from './models/usermodel.js'



dotenv.config()
const API_KEY = process.env.API_KEY
const URL = process.env.BASE_URL
const app = express()

app.use(cors())
app.use(bodyParser.json())
await connect()
app.get('/movie/popular', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching movies data' });
    }
  });
  app.get('/discover/horror', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&page=1&with_genres=27`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching horror movies data' });
    }
  });
  app.get('/discover/action', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&page=1&with_genres=28`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching action movies data' });
    }
  });
  app.get('/discover/sci-fi', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&page=1&with_genres=878`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching sci-fi movies data' });
    }
  });
  app.get('/discover/comedy', async (req, res) => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=release_date.desc&page=2&with_genres=35`);
      const data = await response.json();
  
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error fetching comedy movies data' });
    }
  });

// app.get('/genre/movie/list', async (req, res) => {
//     try {
//       const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`);
//       const data = await response.json();
  
//       res.json(data);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Error fetching genre movies data' });
//     }
//   });
app.get('/getkey', (req, res)=>{
  res.json(API_KEY)
})
app.post('/api/register', async (req, res)=>{
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
    console.log('email is: ', email)
    console.log('pw is: ', hashedPw)

    //store user in db
    const user = await User({ //create user with the hashed pw
      email,
      password: hashedPw,
    
    })
    await user.save() //saved to db

    console.log('user saved')
    res.status(201).json({message:"user created"})

 

})
app.post('/api/login', async(req, res)=>{
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
      password: user.password,

    }
    const token = jwt.sign(payload,process.env.JWT_SECRET)
    console.log('token is: ', token, "and user is: ", user)

   
    res.json({message: 'successfully logged in', token, user})

  }
  catch(err){
    //res.json({status: 'error'})
    res.status(500).send('server error');

  }

})




app.listen(3001)